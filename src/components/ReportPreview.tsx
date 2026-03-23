import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ReportData } from '../types';

interface ReportPreviewProps {
  data: ReportData;
}

const ORIGINAL_CHART_DATA: Record<string, { surface: any[], depth: any[] }> = {
  'Wasmania auropunctata': {
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
    ]
  },
  'Tapinoma erraticum': {
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
    ]
  }
};

export const ReportPreview: React.FC<ReportPreviewProps> = ({ data }) => {
  const speciesCount = data.species.length;
  const totalPages = 8 + (speciesCount * 2) + 2; // 8 base + 2 per species + Conclusion + Appendix

  return (
    <div id="report-content" className="flex flex-col items-center gap-8 py-8">
      {/* Page 1: Summary Page */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 1 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        {/* Title Box */}
        <div className="border border-black p-4 text-center mb-10 mt-10">
          <h1 className="text-lg uppercase">
            SIMULATED USE TRIAL OF THE EFFICACY OF AN INSECTICIDAL PRODUCT INTENDED TO CONTROL ANTS
          </h1>
        </div>

        {/* Info Section */}
        <div className="border border-black p-4 space-y-4 mb-10 text-sm">
          <p><span className="font-bold">Type of trial:</span> <span className="font-bold">Simulated-use</span></p>
          <p><span className="font-bold">Test product:</span> <span className="font-bold uppercase">{data.metadata.productName}</span></p>
          <p><span className="font-bold">Target organisms:</span> <span className="italic font-bold">{data.metadata.targetOrganisms}</span></p>
        </div>

        {/* Date and Report No */}
        <div className="mb-10 text-sm">
          <p className="uppercase font-bold">{data.metadata.date.split(' ').slice(1).join(' ').toUpperCase()}</p>
          <p className="font-bold">Report {data.metadata.studyTecNo}</p>
        </div>

        {/* Lab Info */}
        <div className="mb-10 text-sm">
          <p className="uppercase font-bold">LABORATOIRE T.E.C.</p>
          <p>1, rue Jules Védrines, ZAC Maignon</p>
          <p>F – 64600 Anglet (France)</p>
        </div>

        {/* Director */}
        <div className="mb-10 text-sm">
          <p className="font-bold">B.Serrano</p>
          <p className="font-bold">T.E.C. Director</p>
          {/* Stamp Placeholder */}
          <div className="w-40 h-20 opacity-30 mt-2 border border-dashed border-gray-300 flex items-center justify-center text-[8px]">
            STAMP PLACEHOLDER
          </div>
        </div>

        {/* Sponsor */}
        <div className="mt-auto text-sm">
          <p className="font-bold uppercase">SPONSOR:</p>
          <p className="font-bold uppercase">{data.metadata.sponsor}</p>
          <div className="whitespace-pre-line">{data.metadata.sponsorAddress}</div>
        </div>
      </div>

      {/* Page 2: Good Experimental Practice */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 2 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <div className="border border-black p-4 text-center mb-12">
          <h2 className="text-xl font-normal uppercase tracking-widest">GOOD EXPERIMENTAL PRACTICE</h2>
        </div>

        <div className="space-y-1 font-sans text-sm pt-8">
          <div className="grid grid-cols-[250px_1fr]"><span>STUDY TEC N°:</span> <span>{data.metadata.studyTecNo}</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>SPONSOR:</span> <span>{data.metadata.sponsor}</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>NUMBER OF PAGES:</span> <span>{totalPages}</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>TEST PRODUCT:</span> <span>{data.metadata.productName}, Batch No. {data.metadata.batchNo} -received {data.metadata.receptionDate}.</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>FACILITIES:</span> <span>T.E.C. 1, rue Jules Védrines, ZAC Maignon 64600 Anglet (France)</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>TIMING:</span> <span>From {data.metadata.timing}</span></div>
        </div>

        <div className="pt-8 space-y-1">
          <div className="grid grid-cols-[250px_1fr]"><span>STUDY DIRECTOR:</span> <span>Bruno Serrano / Agronomist engineer</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>STUDY ENGINEER:</span> <span>Mélissa GONCALVES / BTS Analysis</span></div>
          <div className="grid grid-cols-[250px_1fr]"><span>QUALITY INSURANCE RESPONSIBLE:</span> <span>Bruno Serrano / Agronomist engineer</span></div>
        </div>

        <div className="pt-12">
          <h2 className="uppercase mb-4 font-normal">METHODOLOGY:</h2>
          <p className="text-justify leading-relaxed mb-4">
            TEC methodology adapted from:<br />
            French registration standard methodology C.E.B. N°196 (Method for the assessment of the efficacy of insecticidal baits against common species of ants – 1997) which in the Appendix of Guidance on the Biocidal Products Regulation - Volume II Efficacy – Assessment and Evaluation (Parts B&C) – Version 6.0 - August 2023 - ECHA
          </p>
          <p className="text-justify leading-relaxed mb-4">
            Agreement procedures for Officially Recognized Trials according to the European directive 91/414/CE / Rule 1107/2009 (French ministry of agriculture)
          </p>
          <p>ARCHIVING: 10 years, hard and electronic copies</p>
          <p className="mt-6">There were no circumstances which could have affected the reliability of the data presented in this report.</p>
          <p className="mt-6">Bruno Serrano</p>
          <p>Date: {data.metadata.date}</p>
        </div>
      </div>

      {/* Page 3: Participants & Warning */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 3 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <h2 className="text-xl font-normal uppercase border-b-2 border-black pb-2 mb-6">PARTICIPANTS IN TESTS</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <p className="uppercase text-base">Bruno SERRANO</p>
            <p>Trial responsible / T.E.C. Director</p>
            <p>Agronomist engineer ENSAT T84</p>
            <p>Certiphyto DESA + Certibiocides</p>
          </div>
          <div>
            <p className="uppercase text-base">Marie-Paule MONTAUT</p>
            <p>Technician</p>
            <p>Internal formation</p>
            <p>Certiphyto DESA + Certibiocides</p>
          </div>
          <div>
            <p className="uppercase text-base">Mélissa GONCALVES</p>
            <p>Trial responsible</p>
            <p>BTS Analysis</p>
            <p>Certiphyto DESA + Certibiocides</p>
          </div>
          <div>
            <p className="uppercase text-base">Elise TALLET</p>
            <p>Metrology responsible</p>
            <p>BTS Analysis</p>
          </div>
        </div>

        <div className="pt-8">
          <p>Anglet, {data.metadata.date}</p>
        </div>

        {/* Stamp Placeholder */}
        <div className="mt-4 w-64 h-32 opacity-40 border border-blue-800/30 flex items-center justify-center text-[10px] text-blue-900 font-serif italic relative">
          <div className="absolute inset-0 border-2 border-blue-900/20 m-1"></div>
          <div className="text-center transform -rotate-2">
            LABORATOIRE T.E.C.<br/>
            1, rue Jules Védrines - Z.A.C. Maignon<br/>
            64600 ANGLET (FRANCE)<br/>
            Tél. +33 (0)5 59 52 08 49<br/>
            labo.tec@yahoo.fr
          </div>
          {/* Stylized Signature */}
          <svg className="absolute w-full h-full pointer-events-none opacity-60" viewBox="0 0 200 100">
            <path d="M20,50 Q50,20 80,50 T140,50 T180,30" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M30,60 Q60,80 90,60 T150,40" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="pt-8 italic">
          <p className="underline mb-2">Warning</p>
          <div className="text-justify text-xs leading-tight">
            <p>The results described in this report were generated on the provided samples, not degraded by the actual conditions of use or of storage.</p>
            <p>The samples tested were accepted in good faith that they were representative of the intended final formulation(s)/products and the test methods employed were those agreed by the sponsor.</p>
            <p>The trial has been conducted on laboratory strains of "model" insects and the susceptibility of the local insects' strains can be different in other labs or in the real conditions of use.</p>
            <p>As such the results should be taken only as an indication of the potential for activity of the formulations or products under test. Then, these results cannot be considered as confirmation that a formulation or product will work in a clinical or field application.</p>
            <p>Evidence for such activity can only be obtained from properly constructed and executed clinical or local field trials.</p>
          </div>
        </div>
      </div>

      {/* Page 4: Contents */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 4 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <div className="pt-12">
          <h2 className="text-xl font-bold mb-8">CONTENTS</h2>
          <div className="space-y-4 text-base">
            <div className="flex justify-between"><span>1. OBJECTIVE</span><span>5</span></div>
            <div className="flex justify-between"><span>2. MATERIALS AND METHOD</span><span>5</span></div>
            <div className="flex justify-between"><span>3. PRODUCT AND DOSAGE</span><span>8</span></div>
            <div className="flex justify-between"><span>4. RESULTS</span><span>9</span></div>
            <div className="flex justify-between"><span>5. CONCLUSION</span><span>13</span></div>
            <div className="flex justify-between"><span>APPENDIX 1: Raw data</span><span>14</span></div>
          </div>
        </div>
      </div>

      {/* Page 5: Materials and Method */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 5 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <div className="pt-12">
          {/* Boxed Title */}
          <div className="border border-black p-4 text-center mb-10">
            <h1 className="text-lg uppercase font-normal">
              SIMULATED USE TRIAL OF THE EFFICACY OF AN INSECTICIDAL PRODUCT INTENDED TO CONTROL ANTS
            </h1>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4 uppercase">1. OBJECTIVE</h2>
            <p className="text-justify mb-4">
              The objective of this trial is to quantify the efficiency of the product <span className="font-bold uppercase">{data.metadata.productName}</span> against ants <span className="italic font-bold">{data.metadata.targetOrganisms}</span> in simulated-use conditions.
            </p>
            <p className="text-justify">
              The efficiency is quantified by the count of the frequency of crossing of the ants in surface and in depth. The final count of the mortality of the ants and the queen at the end of the trial (4 weeks) is also recorded to confirm the complete destruction of the nests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4 uppercase">2. MATERIALS AND METHOD</h2>
            
            <h3 className="font-bold mb-2 uppercase">2.1. BIOLOGICAL MATERIAL</h3>
            <div className="ml-4 mb-4 space-y-1">
              <p><span className="underline">Target organisms:</span></p>
              <p><span className="font-bold">Species:</span> <span className="italic">{data.metadata.targetOrganisms}</span></p>
              <p><span className="font-bold">Strains:</span> T.E.C. strains</p>
              <p><span className="font-bold">Origin:</span> French Guyana (Wasmania) and Israel (Tapinoma)</p>
              <p><span className="font-bold">Stage:</span> whole nests (workers, brood and queen)</p>
              <p><span className="font-bold">Rearing conditions:</span> 26°C ± 2°C; 70% ± 10% RH; photoperiod 12h/12h.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Page 6: Apparatus and procedure */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 6 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <div className="pt-12">
          <h3 className="font-bold mb-2 uppercase">2.2. APPARATUS AND PROCEDURE</h3>
          <p className="text-justify mb-4">
            The trial was conducted in simulated-use conditions, in T.E.C. laboratory.
          </p>
          <p className="text-justify mb-4">
            The ants were acclimatized in the trial's units 1 week before the treatment. The units were composed of a foraging area (surface) and a nesting area (depth), connected by a tube.
          </p>
          <p className="text-justify mb-4">
            The ants were provided with competition food and water source. The trial was conducted with 3 replicates for the test product and 3 replicates for the untreated control.
          </p>
        </div>
      </div>

      {/* Page 7: Observations and Replicates */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 7 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <div className="pt-12">
          <h3 className="font-bold mb-2 uppercase">2.3. OBSERVATIONS OF THE EFFICACY</h3>
          <p className="text-justify mb-4">
            The mortality was recorded every week during 4 weeks. The destruction of the nest was confirmed by the opening of the nest at the end of the trial.
          </p>
          <h3 className="font-bold mb-2 uppercase">2.4. REPLICATES</h3>
          <p className="text-justify mb-4">
            The trial was conducted with 3 replicates for the test product and 3 replicates for the untreated control.
          </p>
        </div>
      </div>

      {/* Page 8: Product, Treatment, Dosage */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 8 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4 uppercase">3. PRODUCT, TREATMENT, DOSAGE</h2>
          
          <h3 className="font-bold mb-2 uppercase">3.1. PRODUCT</h3>
          <div className="ml-4 mb-6 space-y-1">
            <p><span className="font-bold">Name:</span> <span className="uppercase">{data.metadata.productName}</span></p>
            <p><span className="font-bold">Batch No.:</span> {data.metadata.batchNo}</p>
            <p><span className="font-bold">Reception date:</span> {data.metadata.receptionDate}</p>
            <p><span className="font-bold">Provider:</span> {data.metadata.sponsor}</p>
          </div>

          <h3 className="font-bold mb-2 uppercase">3.2. TREATMENT</h3>
          <p className="text-justify mb-4">
            The product was applied in the foraging area of the units. The dead insects were left in the units during the trial.
          </p>
          <p className="text-justify mb-4 font-bold uppercase">
            DOSAGE: {data.metadata.dosage}.
          </p>
          <p className="text-justify">
            A single application was performed at the beginning of the trial.
          </p>
        </section>
      </div>

      {/* Results Section */}
      {data.species.map((species, sIdx) => (
        <React.Fragment key={sIdx}>
          {/* Surface Results Page */}
          <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
              <div className="flex flex-col">
                <span>T.E.C. Laboratory</span>
                <span>XF5</span>
                <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
              </div>
              <div className="font-bold">Confidential</div>
              <div className="text-right flex flex-col">
                <span>Page {9 + sIdx * 2} of {totalPages}</span>
                <span>Date: {data.metadata.date}</span>
                <span>Trial No. {data.metadata.trialNo}</span>
              </div>
            </div>

            {sIdx === 0 && (
              <>
                <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-6 uppercase">4. RESULTS</h2>
                <p className="mb-6">The figures below present the means of replicates; the raw data are in APPENDIX.</p>
              </>
            )}

            <h3 className="text-lg font-bold mb-4 uppercase">4.{sIdx + 1}. RESULTS ON <span className="italic">{species.name}</span></h3>
            
            <p className="mb-4 text-sm italic">Figure {sIdx * 2 + 1}: evolution of the frequency of ants in surface</p>
            
            <h4 className="font-bold text-sm mb-2 uppercase">FREQUENCY OF CROSSING IN SURFACE (in % of reduction)</h4>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-black text-sm">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-black p-2"></th>
                    <th colSpan={4} className="border border-black p-2">days of exposure</th>
                  </tr>
                  <tr className="bg-white">
                    <th className="border border-black p-2"></th>
                    {species.surface.map(d => <th key={d.day} className="border border-black p-2">{d.day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-bold">Untreated control</td>
                    {species.surface.map(d => <td key={d.day} className="border border-black p-2 text-center">{d.untreated}</td>)}
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Test product</td>
                    {species.surface.map(d => <td key={d.day} className="border border-black p-2 text-center">{d.testProduct}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs italic mb-4">Note: a negative reduction means an increase</p>

            <div className="h-96 mb-12 border border-black p-6 bg-[#c0c0c0]">
              <p className="text-center font-bold text-sm mb-6 uppercase">% of reduction of the frequency of ants in surface</p>
              <ResponsiveContainer width="100%" height="85%">
                  <LineChart 
                    data={species.surface} 
                    margin={{ top: 5, right: 120, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid stroke="#666" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={{ stroke: '#000' }} 
                      tickLine={{ stroke: '#000' }} 
                      tick={{ fill: '#000', fontSize: 10 }}
                    />
                    <YAxis 
                      domain={[-20, 100]} 
                      ticks={[-20, 0, 20, 40, 60, 80, 100]} 
                      axisLine={{ stroke: '#000' }} 
                      tickLine={{ stroke: '#000' }} 
                      tick={{ fill: '#000', fontSize: 10 }}
                    />
                    <Tooltip />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right" 
                      wrapperStyle={{ 
                        border: '1px solid black', 
                        padding: '10px', 
                        backgroundColor: 'white', 
                        right: -20,
                        fontSize: '10px'
                      }}
                    />
                    <Line 
                      type="linear" 
                      dataKey="untreated" 
                      stroke="#000080" 
                      name="untreated control" 
                      strokeWidth={1.5} 
                      dot={{ r: 4, fill: '#000080', strokeWidth: 1, stroke: '#000080', shape: 'diamond' }} 
                      isAnimationActive={false}
                    />
                    <Line 
                      type="linear" 
                      dataKey="testProduct" 
                      stroke="#ff00ff" 
                      name="Test product" 
                      strokeWidth={1.5} 
                      dot={{ r: 4, fill: '#ff00ff', strokeWidth: 1, stroke: '#ff00ff', shape: 'square' }} 
                      isAnimationActive={false}
                    />
                  </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Depth Results Page */}
          <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
              <div className="flex flex-col">
                <span>T.E.C. Laboratory</span>
                <span>XF5</span>
                <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
              </div>
              <div className="font-bold">Confidential</div>
              <div className="text-right flex flex-col">
                <span>Page {10 + sIdx * 2} of {totalPages}</span>
                <span>Date: {data.metadata.date}</span>
                <span>Trial No. {data.metadata.trialNo}</span>
              </div>
            </div>

            <p className="mb-4 text-sm italic">Figure {sIdx * 2 + 2}: evolution of the frequency of ants in depth</p>
            
            <p className="text-xs italic mb-4">Note: a negative reduction means an increase</p>

            <h4 className="font-bold text-sm mb-2 uppercase">FREQUENCY OF CROSSING IN DEPTH (in % of reduction)</h4>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-black text-sm">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-black p-2"></th>
                    <th colSpan={4} className="border border-black p-2">days of exposure</th>
                  </tr>
                  <tr className="bg-white">
                    <th className="border border-black p-2"></th>
                    {species.depth.map(d => <th key={d.day} className="border border-black p-2">{d.day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-bold">Untreated control</td>
                    {species.depth.map(d => <td key={d.day} className="border border-black p-2 text-center">{d.untreated}</td>)}
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Test product</td>
                    {species.depth.map(d => <td key={d.day} className="border border-black p-2 text-center">{d.testProduct}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="h-96 mb-12 border border-black p-6 bg-[#c0c0c0]">
              <p className="text-center font-bold text-sm mb-6 uppercase">% of reduction of the frequency of ants in depth</p>
              <ResponsiveContainer width="100%" height="85%">
                  <LineChart 
                    data={species.depth} 
                    margin={{ top: 5, right: 120, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid stroke="#666" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={{ stroke: '#000' }} 
                      tickLine={{ stroke: '#000' }} 
                      tick={{ fill: '#000', fontSize: 10 }}
                    />
                    <YAxis 
                      domain={[-20, 100]} 
                      ticks={[-20, 0, 20, 40, 60, 80, 100]} 
                      axisLine={{ stroke: '#000' }} 
                      tickLine={{ stroke: '#000' }} 
                      tick={{ fill: '#000', fontSize: 10 }}
                    />
                    <Tooltip />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right" 
                      wrapperStyle={{ 
                        border: '1px solid black', 
                        padding: '10px', 
                        backgroundColor: 'white', 
                        right: -20,
                        fontSize: '10px'
                      }}
                    />
                    <Line 
                      type="linear" 
                      dataKey="untreated" 
                      stroke="#000080" 
                      name="untreated control" 
                      strokeWidth={1.5} 
                      dot={{ r: 4, fill: '#000080', strokeWidth: 1, stroke: '#000080', shape: 'diamond' }} 
                      isAnimationActive={false}
                    />
                    <Line 
                      type="linear" 
                      dataKey="testProduct" 
                      stroke="#ff00ff" 
                      name="Test product" 
                      strokeWidth={1.5} 
                      dot={{ r: 4, fill: '#ff00ff', strokeWidth: 1, stroke: '#ff00ff', shape: 'square' }} 
                      isAnimationActive={false}
                    />
                  </LineChart>
              </ResponsiveContainer>
            </div>

            <h4 className="font-bold mb-2 uppercase">Table {sIdx + 1}: final count of alive ants after 4 weeks (nests' opening)</h4>
            <p className="text-sm italic mb-4">Means of replicates (the raw data are in Appendix)</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black text-sm">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-black p-2">Treatment</th>
                    <th className="border border-black p-2">Mean number of ants at start</th>
                    <th className="border border-black p-2">Mean number of ants after 4 weeks</th>
                    <th className="border border-black p-2">Mean % of reduction</th>
                    <th className="border border-black p-2">Queen: dead or alive?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2">untreated</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.untreated.start}</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.untreated.end}</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.untreated.reduction}</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.untreated.queen}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Test product</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.testProduct.start}</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.testProduct.end}</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.testProduct.reduction}</td>
                    <td className="border border-black p-2 text-center">{species.finalCount.testProduct.queen}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ))}

      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page {8 + (speciesCount * 2) + 1} of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold uppercase underline mb-6">Comments:</h2>
          <p className="text-justify mb-4">
            On both target organisms, the increase of the frequency of crossing and the final count in the Untreated Control validate the trial by proving a good acclimatization of the ants in the trial's conditions.
          </p>
          <p className="text-justify mb-4">
            In the series treated by the product, the frequency of ants in surface and inside were coherent together and proved the destruction of the ants' nests in less than 4 weeks (and probably before 2 weeks as no more ants were observed in surface and in depth).
          </p>
          <p className="text-justify">
            This destruction proved the palatability of the baits and the lethal effect to the workers and the queen, for both species of ants.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4 uppercase">5. CONCLUSION</h2>
          <p className="text-justify mb-4">
            In the conditions of the trial, with the sample provided, insects' strains and methodology used, the product:
          </p>
          <p className="mb-4 uppercase">{data.metadata.productName}</p>
          <p className="text-justify">
            applied at a rate of {data.metadata.dosage},
          </p>
          <p className="text-justify mt-4">
            has proved a complete efficacy against ants <span className="italic">{data.metadata.targetOrganisms}</span> in this simulated-use trial.
          </p>
          <div className="mt-12 border-t border-black pt-4">
          </div>
        </section>
      </div>

      {/* Page 14: Appendix Raw Data Wasmania */}
      <div className="report-page w-[210mm] h-[297mm] bg-white p-[20mm] shadow-2xl flex flex-col font-sans relative text-[9px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page {totalPages} of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <h2 className="text-lg font-bold uppercase mb-4">APPENDIX - RAW DATA</h2>
        <h3 className="text-base font-bold italic mb-4">Wasmania auropunctata</h3>

        <h4 className="font-bold uppercase mb-2">REDUCTION OF THE FREQUENCY OF ANTS IN SURFACE</h4>
        <table className="w-full border-collapse border border-black text-center mb-8">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1">-1 day</th>
              <th className="border border-black p-1" colSpan={2}>7 days</th>
              <th className="border border-black p-1" colSpan={2}>14 days</th>
              <th className="border border-black p-1" colSpan={2}>21 days</th>
              <th className="border border-black p-1" colSpan={2}>28 days</th>
            </tr>
            <tr className="bg-white">
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
            </tr>
          </thead>
          <tbody>
            {/* Test Product */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Test product</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">82</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">88</td>
              <td className="border border-black p-1">1</td>
              <td className="border border-black p-1">99</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">107</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">90</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">92,0</td>
              <td className="border border-black p-1">1,0</td>
              <td className="border border-black p-1">98,8</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
            </tr>
            {/* Untreated Control */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Untreated control</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">86</td>
              <td className="border border-black p-1">89</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">92</td>
              <td className="border border-black p-1">-7</td>
              <td className="border border-black p-1">94</td>
              <td className="border border-black p-1">-9</td>
              <td className="border border-black p-1">91</td>
              <td className="border border-black p-1">-6</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">79</td>
              <td className="border border-black p-1">75</td>
              <td className="border border-black p-1">5</td>
              <td className="border border-black p-1">82</td>
              <td className="border border-black p-1">23</td>
              <td className="border border-black p-1">80</td>
              <td className="border border-black p-1">-1</td>
              <td className="border border-black p-1">83</td>
              <td className="border border-black p-1">-5</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">106</td>
              <td className="border border-black p-1">114</td>
              <td className="border border-black p-1">-8</td>
              <td className="border border-black p-1">109</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">115</td>
              <td className="border border-black p-1">-8</td>
              <td className="border border-black p-1">119</td>
              <td className="border border-black p-1">-12</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">92</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">-7</td>
              <td className="border border-black p-1">96</td>
              <td className="border border-black p-1">-4</td>
              <td className="border border-black p-1">90</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">-1</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">99</td>
              <td className="border border-black p-1">94</td>
              <td className="border border-black p-1">5</td>
              <td className="border border-black p-1">97</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">95</td>
              <td className="border border-black p-1">4</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">1</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">92,4</td>
              <td className="border border-black p-1">94,0</td>
              <td className="border border-black p-1">-1,5</td>
              <td className="border border-black p-1">95,2</td>
              <td className="border border-black p-1">2,1</td>
              <td className="border border-black p-1">94,8</td>
              <td className="border border-black p-1">-2,6</td>
              <td className="border border-black p-1">96,8</td>
              <td className="border border-black p-1">-4,6</td>
            </tr>
          </tbody>
        </table>

        <h4 className="font-bold uppercase mb-2">REDUCTION OF THE FREQUENCY OF ANTS IN DEPTH</h4>
        <table className="w-full border-collapse border border-black text-center mb-4">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1">-1 day</th>
              <th className="border border-black p-1" colSpan={2}>7 days</th>
              <th className="border border-black p-1" colSpan={2}>14 days</th>
              <th className="border border-black p-1" colSpan={2}>21 days</th>
              <th className="border border-black p-1" colSpan={2}>28 days</th>
            </tr>
            <tr className="bg-white">
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
            </tr>
          </thead>
          <tbody>
            {/* Test Product */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Test product</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">33</td>
              <td className="border border-black p-1">6</td>
              <td className="border border-black p-1">82</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">41</td>
              <td className="border border-black p-1">5</td>
              <td className="border border-black p-1">88</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">40</td>
              <td className="border border-black p-1">3</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">57</td>
              <td className="border border-black p-1">4</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">42</td>
              <td className="border border-black p-1">1</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">42,6</td>
              <td className="border border-black p-1">3,8</td>
              <td className="border border-black p-1">90,5</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
            </tr>
            {/* Untreated Control */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Untreated control</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">43</td>
              <td className="border border-black p-1">44</td>
              <td className="border border-black p-1">-2</td>
              <td className="border border-black p-1">42</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">40</td>
              <td className="border border-black p-1">7</td>
              <td className="border border-black p-1">44</td>
              <td className="border border-black p-1">-2</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">35</td>
              <td className="border border-black p-1">34</td>
              <td className="border border-black p-1">3</td>
              <td className="border border-black p-1">38</td>
              <td className="border border-black p-1">-9</td>
              <td className="border border-black p-1">32</td>
              <td className="border border-black p-1">9</td>
              <td className="border border-black p-1">33</td>
              <td className="border border-black p-1">6</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">39</td>
              <td className="border border-black p-1">43</td>
              <td className="border border-black p-1">-10</td>
              <td className="border border-black p-1">45</td>
              <td className="border border-black p-1">-15</td>
              <td className="border border-black p-1">46</td>
              <td className="border border-black p-1">-18</td>
              <td className="border border-black p-1">42</td>
              <td className="border border-black p-1">-8</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">41</td>
              <td className="border border-black p-1">32</td>
              <td className="border border-black p-1">22</td>
              <td className="border border-black p-1">33</td>
              <td className="border border-black p-1">20</td>
              <td className="border border-black p-1">36</td>
              <td className="border border-black p-1">12</td>
              <td className="border border-black p-1">38</td>
              <td className="border border-black p-1">7</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">44</td>
              <td className="border border-black p-1">40</td>
              <td className="border border-black p-1">9</td>
              <td className="border border-black p-1">44</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">42</td>
              <td className="border border-black p-1">5</td>
              <td className="border border-black p-1">48</td>
              <td className="border border-black p-1">-9</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">40,4</td>
              <td className="border border-black p-1">38,6</td>
              <td className="border border-black p-1">4,3</td>
              <td className="border border-black p-1">40,4</td>
              <td className="border border-black p-1">-0,4</td>
              <td className="border border-black p-1">39,2</td>
              <td className="border border-black p-1">2,9</td>
              <td className="border border-black p-1">41,0</td>
              <td className="border border-black p-1">-1,2</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2">rep = replicate</p>
      </div>

      {/* Page 15: Appendix Raw Data Tapinoma */}
      <div className="page-break-before pt-12 min-h-[260mm] mb-20 font-sans text-[9px]">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black pb-1 mb-6 text-[10px]">
          <div className="flex flex-col">
            <span>T.E.C. Laboratory</span>
            <span>XF5</span>
            <span>Simulated-use trial of the efficacy of an anti-ant granule</span>
          </div>
          <div className="font-bold">Confidential</div>
          <div className="text-right flex flex-col">
            <span>Page 15 of {totalPages}</span>
            <span>Date: {data.metadata.date}</span>
            <span>Trial No. {data.metadata.trialNo}</span>
          </div>
        </div>

        <h3 className="text-base font-bold italic mb-4">Tapinoma erraticum</h3>

        <h4 className="font-bold uppercase mb-2">REDUCTION OF THE FREQUENCY OF ANTS IN SURFACE</h4>
        <table className="w-full border-collapse border border-black text-center mb-8">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1">-1 day</th>
              <th className="border border-black p-1" colSpan={2}>7 days</th>
              <th className="border border-black p-1" colSpan={2}>14 days</th>
              <th className="border border-black p-1" colSpan={2}>21 days</th>
              <th className="border border-black p-1" colSpan={2}>28 days</th>
            </tr>
            <tr className="bg-white">
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
            </tr>
          </thead>
          <tbody>
            {/* Test Product */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Test product</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">91</td>
              <td className="border border-black p-1">5</td>
              <td className="border border-black p-1">95</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">99</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">92</td>
              <td className="border border-black p-1">4</td>
              <td className="border border-black p-1">96</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">96</td>
              <td className="border border-black p-1">3</td>
              <td className="border border-black p-1">97</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">94,2</td>
              <td className="border border-black p-1">2,8</td>
              <td className="border border-black p-1">97,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
            </tr>
            {/* Untreated Control */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Untreated control</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">81</td>
              <td className="border border-black p-1">83</td>
              <td className="border border-black p-1">-2</td>
              <td className="border border-black p-1">85</td>
              <td className="border border-black p-1">-5</td>
              <td className="border border-black p-1">86</td>
              <td className="border border-black p-1">-6</td>
              <td className="border border-black p-1">88</td>
              <td className="border border-black p-1">-9</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">103</td>
              <td className="border border-black p-1">101</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">98</td>
              <td className="border border-black p-1">-14</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">10</td>
              <td className="border border-black p-1">99</td>
              <td className="border border-black p-1">4</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">86</td>
              <td className="border border-black p-1">89</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">-8</td>
              <td className="border border-black p-1">94</td>
              <td className="border border-black p-1">-9</td>
              <td className="border border-black p-1">95</td>
              <td className="border border-black p-1">-10</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">90</td>
              <td className="border border-black p-1">91</td>
              <td className="border border-black p-1">-1</td>
              <td className="border border-black p-1">94</td>
              <td className="border border-black p-1">-4</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">96</td>
              <td className="border border-black p-1">-7</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">94</td>
              <td className="border border-black p-1">92</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">91</td>
              <td className="border border-black p-1">3</td>
              <td className="border border-black p-1">90</td>
              <td className="border border-black p-1">4</td>
              <td className="border border-black p-1">88</td>
              <td className="border border-black p-1">6</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">90,8</td>
              <td className="border border-black p-1">91,2</td>
              <td className="border border-black p-1">-0,6</td>
              <td className="border border-black p-1">92,2</td>
              <td className="border border-black p-1">-5,7</td>
              <td className="border border-black p-1">91,2</td>
              <td className="border border-black p-1">-1,0</td>
              <td className="border border-black p-1">93,2</td>
              <td className="border border-black p-1">-3,1</td>
            </tr>
          </tbody>
        </table>

        <h4 className="font-bold uppercase mb-2">REDUCTION OF THE FREQUENCY OF ANTS IN DEPTH</h4>
        <table className="w-full border-collapse border border-black text-center mb-4">
          <thead>
            <tr className="bg-white">
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1" rowSpan={2}></th>
              <th className="border border-black p-1">-1 day</th>
              <th className="border border-black p-1" colSpan={2}>7 days</th>
              <th className="border border-black p-1" colSpan={2}>14 days</th>
              <th className="border border-black p-1" colSpan={2}>21 days</th>
              <th className="border border-black p-1" colSpan={2}>28 days</th>
            </tr>
            <tr className="bg-white">
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
              <th className="border border-black p-1">Nb of ants</th>
              <th className="border border-black p-1">% reduction</th>
            </tr>
          </thead>
          <tbody>
            {/* Test Product */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Test product</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">27</td>
              <td className="border border-black p-1">2</td>
              <td className="border border-black p-1">93</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">23</td>
              <td className="border border-black p-1">1</td>
              <td className="border border-black p-1">96</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">31</td>
              <td className="border border-black p-1">4</td>
              <td className="border border-black p-1">87</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">33</td>
              <td className="border border-black p-1">4</td>
              <td className="border border-black p-1">88</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">38</td>
              <td className="border border-black p-1">1</td>
              <td className="border border-black p-1">97</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">100</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">30,4</td>
              <td className="border border-black p-1">2,4</td>
              <td className="border border-black p-1">92,1</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
              <td className="border border-black p-1">0,0</td>
              <td className="border border-black p-1">100,0</td>
            </tr>
            {/* Untreated Control */}
            <tr>
              <td className="border border-black p-1 font-bold" rowSpan={6}>Untreated control</td>
              <td className="border border-black p-1">rep 1</td>
              <td className="border border-black p-1">32</td>
              <td className="border border-black p-1">35</td>
              <td className="border border-black p-1">-9</td>
              <td className="border border-black p-1">36</td>
              <td className="border border-black p-1">-13</td>
              <td className="border border-black p-1">33</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">35</td>
              <td className="border border-black p-1">-9</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 2</td>
              <td className="border border-black p-1">30</td>
              <td className="border border-black p-1">28</td>
              <td className="border border-black p-1">7</td>
              <td className="border border-black p-1">26</td>
              <td className="border border-black p-1">13</td>
              <td className="border border-black p-1">28</td>
              <td className="border border-black p-1">7</td>
              <td className="border border-black p-1">28</td>
              <td className="border border-black p-1">7</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 3</td>
              <td className="border border-black p-1">29</td>
              <td className="border border-black p-1">34</td>
              <td className="border border-black p-1">-17</td>
              <td className="border border-black p-1">32</td>
              <td className="border border-black p-1">-10</td>
              <td className="border border-black p-1">30</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">31</td>
              <td className="border border-black p-1">-7</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 4</td>
              <td className="border border-black p-1">38</td>
              <td className="border border-black p-1">39</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">40</td>
              <td className="border border-black p-1">-5</td>
              <td className="border border-black p-1">40</td>
              <td className="border border-black p-1">-5</td>
              <td className="border border-black p-1">41</td>
              <td className="border border-black p-1">-8</td>
            </tr>
            <tr>
              <td className="border border-black p-1">rep 5</td>
              <td className="border border-black p-1">35</td>
              <td className="border border-black p-1">32</td>
              <td className="border border-black p-1">9</td>
              <td className="border border-black p-1">35</td>
              <td className="border border-black p-1">0</td>
              <td className="border border-black p-1">36</td>
              <td className="border border-black p-1">-3</td>
              <td className="border border-black p-1">38</td>
              <td className="border border-black p-1">-9</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black p-1">mean</td>
              <td className="border border-black p-1">32,8</td>
              <td className="border border-black p-1">33,6</td>
              <td className="border border-black p-1">-2,8</td>
              <td className="border border-black p-1">33,8</td>
              <td className="border border-black p-1">-3,0</td>
              <td className="border border-black p-1">33,4</td>
              <td className="border border-black p-1">-1,6</td>
              <td className="border border-black p-1">34,6</td>
              <td className="border border-black p-1">-5,2</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2">rep = replicate</p>
      </div>
    </div>
  );
};
