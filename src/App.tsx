import React, { useState, useCallback } from 'react';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReportData } from './types';
import { cn } from './lib/utils';
import { ReportPreview } from './components/ReportPreview';
import { DataEditor } from './components/DataEditor';
import { Button } from './components/ui/Button';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const INITIAL_DATA: ReportData = {
  metadata: {
    trialNo: '3012-XF5/0225',
    studyTecNo: '3012-XF5/0252',
    date: '29th June 2025',
    productName: 'X-FIRE 0.05% Fipronil granule',
    batchNo: '250509',
    manDate: '09/05/2025',
    expDate: '09/05/2027',
    sponsor: 'RPC. Ltd.',
    sponsorAddress: 'Nes Harim – P .O. BOX 128 9988500\nISRAËL',
    targetOrganisms: 'Wasmania auropunctata and Tapinoma erraticum',
    timing: '1st to 29th June 2025',
    receptionDate: '1st June 2025',
    dosage: '3 g on 10 m²',
  },
  species: [
    {
      name: 'Wasmania auropunctata',
      surface: [
        { day: '7 days', untreated: -1.5, testProduct: 92.1 },
        { day: '14 days', untreated: 2.1, testProduct: 100 },
        { day: '21 days', untreated: -2.6, testProduct: 100 },
        { day: '28 days', untreated: -4.6, testProduct: 100 },
      ],
      depth: [
        { day: '7 days', untreated: 4.3, testProduct: 90.5 },
        { day: '14 days', untreated: -0.4, testProduct: 100 },
        { day: '21 days', untreated: 2.9, testProduct: 100 },
        { day: '28 days', untreated: -1.2, testProduct: 100 },
      ],
      finalCount: {
        untreated: { start: 500, end: 483, reduction: 3.4, queen: 'Alive' },
        testProduct: { start: 500, end: 0, reduction: 100, queen: 'Dead' },
      },
    },
    {
      name: 'Tapinoma erraticum',
      surface: [
        { day: '7 days', untreated: -0.6, testProduct: 97 },
        { day: '14 days', untreated: -5.7, testProduct: 100 },
        { day: '21 days', untreated: -1, testProduct: 100 },
        { day: '28 days', untreated: -3.1, testProduct: 100 },
      ],
      depth: [
        { day: '7 days', untreated: -2.8, testProduct: 92.1 },
        { day: '14 days', untreated: -3, testProduct: 100 },
        { day: '21 days', untreated: -1.6, testProduct: 100 },
        { day: '28 days', untreated: -5.2, testProduct: 100 },
      ],
      finalCount: {
        untreated: { start: 500, end: 493, reduction: 1.4, queen: 'Alive' },
        testProduct: { start: 500, end: 0, reduction: 100, queen: 'Dead' },
      },
    },
  ],
};

export default function App() {
  const [data, setData] = useState<ReportData>(INITIAL_DATA);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modifiedPdfBlob, setModifiedPdfBlob] = useState<Blob | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    let file: File | null = null;
    if ('files' in e.target && e.target.files) {
      file = e.target.files[0];
    } else if ('dataTransfer' in e && e.dataTransfer.files) {
      file = e.dataTransfer.files[0];
    }

    if (!file) return;

    // Check file size - Gemini output limit is roughly 16k tokens (~50-60KB base64)
    if (file.size > 100 * 1024) {
      setProcessingError('File too large for Gemini processing (max 100KB). Falling back to local preview.');
      setShowPreview(true);
      return;
    }

    setIsProcessing(true);
    setProcessingError(null);
    
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a high-precision PDF editing service.
Original PDF is attached.
Updated Data: ${JSON.stringify(data)}

Task: Use Python (pypdf or reportlab) to edit the PDF.
Instructions:
1. Load the original PDF.
2. Identify the placeholder text/values and replace them with the updated data.
3. Maintain EXACT alignment and font styles. Ensure all text is perfectly horizontal and aligned with the original layout.
4. If updating charts, ensure the lines are straight and points are accurately plotted according to the numerical data.
5. Return ONLY the base64 string of the modified PDF in the JSON field "modifiedPdfBase64".
6. Do not include any explanation or code comments in the output.`
              },
              {
                inlineData: {
                  mimeType: file.type,
                  data: base64Data
                }
              }
            ]
          }
        ],
        config: {
          tools: [{ codeExecution: {} }],
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              modifiedPdfBase64: { 
                type: Type.STRING,
                description: "The base64 encoded string of the modified PDF file."
              }
            },
            required: ["modifiedPdfBase64"]
          }
        }
      });

      // Extract the base64 from the JSON response
      let base64Result = '';
      try {
        const jsonResponse = JSON.parse(response.text || '{}');
        base64Result = jsonResponse.modifiedPdfBase64 || '';
      } catch (e) {
        // Fallback to manual extraction if JSON parsing fails
        const match = response.text?.match(/[A-Za-z0-9+/=]{100,}/);
        if (match) base64Result = match[0];
      }

      if (base64Result) {
        const byteCharacters = atob(base64Result);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        setModifiedPdfBlob(blob);
        setShowPreview(true);
      } else {
        throw new Error('No PDF content returned from Gemini');
      }
    } catch (error) {
      console.error('Error processing with Gemini:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('max tokens limit')) {
        setProcessingError('The PDF is too complex for Gemini to return in a single response. Using local preview instead.');
      } else {
        setProcessingError('Failed to process report with Gemini. Falling back to local preview.');
      }
      setShowPreview(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      if (modifiedPdfBlob) {
        const url = URL.createObjectURL(modifiedPdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Modified_Efficacy_Report_${data.metadata.trialNo.replace(/\//g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }

      const pages = document.querySelectorAll('.report-page');
      if (pages.length === 0) {
        console.error('No report pages found');
        alert('Could not find report content to export.');
        return;
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        
        // Add a tiny delay to ensure any dynamic content/charts are fully settled
        await new Promise(resolve => setTimeout(resolve, 100));

        const dataUrl = await toPng(page, { 
          pixelRatio: 3, // Increased for better quality
          backgroundColor: '#ffffff',
          cacheBust: true,
          skipFonts: false,
        });
        
        if (i > 0) pdf.addPage();
        
        // Since we now have exact A4 dimensions in the DOM, 
        // this will map 1:1 to the PDF page without distortion
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'SLOW');
      }
      
      pdf.save(`Efficacy_Report_${data.metadata.trialNo.replace(/\//g, '_')}.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">ReportGen Pro</span>
          </div>
          <div className="flex items-center gap-4">
            {showPreview && (
              <Button 
                onClick={exportPDF} 
                className="gap-2" 
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isExporting ? 'Exporting...' : (modifiedPdfBlob ? 'Download Gemini PDF' : 'Export PDF')}
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!showPreview ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Efficacy Report <span className="text-slate-500 italic">Generator</span>
              </h1>
              <p className="text-lg text-slate-600">
                Upload your existing laboratory report to generate a new variation with modified data while maintaining the professional layout.
              </p>
            </div>

            <motion.div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileUpload}
              className={cn(
                "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center",
                isDragging ? "border-slate-900 bg-slate-100 scale-[1.02]" : "border-slate-300 hover:border-slate-400 bg-white"
              )}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                accept="application/pdf,image/*"
              />
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isProcessing ? (
                    <RefreshCw className="w-8 h-8 text-slate-600 animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-slate-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">
                    {isProcessing ? "Gemini is Editing PDF..." : "Drop original report here"}
                  </p>
                  <p className="text-slate-500">Support PDF or Image files</p>
                  {processingError && (
                    <p className="text-red-500 text-sm mt-2">{processingError}</p>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {[
                { icon: CheckCircle2, title: "Maintain Structure", desc: "Keep all headers, sections, and professional formatting." },
                { icon: RefreshCw, title: "Smart Jitter", desc: "Automatically generate logical variations in numerical data." },
                { icon: AlertCircle, title: "User Validation", desc: "Verify and edit all metadata before final generation." },
              ].map((feature, i) => (
                <div key={i} className="space-y-2">
                  <feature.icon className="w-6 h-6 text-slate-400" />
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Editor Sidebar */}
            <div className="lg:col-span-5 space-y-6 sticky top-24">
              <DataEditor 
                data={data} 
                onChange={setData} 
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowPreview(false)}
              >
                Back to Upload
              </Button>
            </div>

            {/* Preview Area */}
            <div className="lg:col-span-7 bg-slate-200 p-8 rounded-2xl overflow-auto max-h-[calc(100vh-12rem)] shadow-inner">
              <div className="origin-top scale-[0.85] sm:scale-100">
                <ReportPreview data={data} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 py-12 px-6 bg-white mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <FileText className="w-5 h-5" />
            <span className="font-bold">ReportGen Pro</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Laboratory Report Automation. For professional use only.
          </p>
        </div>
      </footer>
    </div>
  );
}
