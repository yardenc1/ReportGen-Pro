import React from 'react';
import { ReportData } from '../types';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Button } from './ui/Button';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';

interface DataEditorProps {
  data: ReportData;
  onChange: (newData: ReportData) => void;
  onJitter: () => void;
}

export const DataEditor: React.FC<DataEditorProps> = ({ data, onChange, onJitter }) => {
  const updateMetadata = (field: keyof ReportData['metadata'], value: string) => {
    onChange({
      ...data,
      metadata: { ...data.metadata, [field]: value },
    });
  };

  const updateSpeciesName = (idx: number, name: string) => {
    const newSpecies = [...data.species];
    newSpecies[idx].name = name;
    onChange({ ...data, species: newSpecies });
  };

  const updateDataPoint = (sIdx: number, type: 'surface' | 'depth', pIdx: number, field: 'untreated' | 'testProduct', value: string) => {
    const newSpecies = [...data.species];
    const numValue = parseFloat(value) || 0;
    newSpecies[sIdx][type][pIdx][field] = numValue;
    onChange({ ...data, species: newSpecies });
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Report Configuration</h2>
        <Button onClick={onJitter} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Jitter Data (Variations)
        </Button>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input value={data.metadata.productName} onChange={(e) => updateMetadata('productName', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Trial No.</Label>
          <Input value={data.metadata.trialNo} onChange={(e) => updateMetadata('trialNo', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Report Date</Label>
          <Input value={data.metadata.date} onChange={(e) => updateMetadata('date', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Study TEC No.</Label>
          <Input value={data.metadata.studyTecNo} onChange={(e) => updateMetadata('studyTecNo', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Sponsor</Label>
          <Input value={data.metadata.sponsor} onChange={(e) => updateMetadata('sponsor', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Sponsor Address</Label>
          <textarea 
            className="w-full min-h-[80px] px-3 py-2 rounded-md border border-slate-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
            value={data.metadata.sponsorAddress} 
            onChange={(e) => updateMetadata('sponsorAddress', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label>Target Organisms</Label>
          <Input value={data.metadata.targetOrganisms} onChange={(e) => updateMetadata('targetOrganisms', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>TIMING:</Label>
          <Input value={data.metadata.timing} onChange={(e) => updateMetadata('timing', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Reception Date:</Label>
          <Input value={data.metadata.receptionDate} onChange={(e) => updateMetadata('receptionDate', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Dosage:</Label>
          <Input value={data.metadata.dosage} onChange={(e) => updateMetadata('dosage', e.target.value)} />
        </div>
      </div>

      {/* Species Data */}
      {data.species.map((species, sIdx) => (
        <div key={sIdx} className="p-4 border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <Input 
              className="font-bold text-lg w-auto border-none p-0 focus-visible:ring-0" 
              value={species.name} 
              onChange={(e) => updateSpeciesName(sIdx, e.target.value)} 
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Surface Activity (% Reduction)</h4>
            <div className="grid grid-cols-5 gap-2">
              <div className="text-xs font-bold text-slate-500">Day</div>
              <div className="text-xs font-bold text-slate-500 col-span-2">Untreated</div>
              <div className="text-xs font-bold text-slate-500 col-span-2">Test Product</div>
              {species.surface.map((dp, pIdx) => (
                <React.Fragment key={pIdx}>
                  <div className="text-sm flex items-center">{dp.day}</div>
                  <Input 
                    type="number" 
                    className="col-span-2 h-8" 
                    value={dp.untreated} 
                    onChange={(e) => updateDataPoint(sIdx, 'surface', pIdx, 'untreated', e.target.value)} 
                  />
                  <Input 
                    type="number" 
                    className="col-span-2 h-8" 
                    value={dp.testProduct} 
                    onChange={(e) => updateDataPoint(sIdx, 'surface', pIdx, 'testProduct', e.target.value)} 
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <Label className="text-xs">Final Count (Test Product)</Label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="Start" 
                  value={species.finalCount.testProduct.start} 
                  onChange={(e) => {
                    const newSpecies = [...data.species];
                    newSpecies[sIdx].finalCount.testProduct.start = parseInt(e.target.value) || 0;
                    onChange({ ...data, species: newSpecies });
                  }}
                />
                <Input 
                  type="number" 
                  placeholder="End" 
                  value={species.finalCount.testProduct.end} 
                  onChange={(e) => {
                    const newSpecies = [...data.species];
                    newSpecies[sIdx].finalCount.testProduct.end = parseInt(e.target.value) || 0;
                    onChange({ ...data, species: newSpecies });
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Queen Status</Label>
              <select 
                className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm"
                value={species.finalCount.testProduct.queen}
                onChange={(e) => {
                  const newSpecies = [...data.species];
                  newSpecies[sIdx].finalCount.testProduct.queen = e.target.value;
                  onChange({ ...data, species: newSpecies });
                }}
              >
                <option value="Dead">Dead</option>
                <option value="Alive">Alive</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
