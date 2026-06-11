export interface AnalysisResult {
  key: "acceptable" | "moderate" | "high" | "veryHigh" | "seriousAndImminent";
  label: string;
  color: string;
  percentage: number;
}

export interface Analysis {
  id: string;
  title: string;
  company: string;
  industrialPlant: string;
  sector: string;
  workstation: string;
  activity: string;
  evaluator: string;
  analysisDate: string;
  result: AnalysisResult[];
}
