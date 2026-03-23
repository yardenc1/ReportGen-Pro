export interface ReportMetadata {
  trialNo: string;
  studyTecNo: string;
  date: string;
  productName: string;
  batchNo: string;
  manDate: string;
  expDate: string;
  sponsor: string;
  sponsorAddress: string;
  targetOrganisms: string;
  timing: string;
  receptionDate: string;
  dosage: string;
}

export interface DataPoint {
  day: string;
  untreated: number;
  testProduct: number;
}

export interface SpeciesData {
  name: string;
  surface: DataPoint[];
  depth: DataPoint[];
  finalCount: {
    untreated: { start: number; end: number; reduction: number; queen: string };
    testProduct: { start: number; end: number; reduction: number; queen: string };
  };
}

export interface ReportData {
  metadata: ReportMetadata;
  species: SpeciesData[];
}
