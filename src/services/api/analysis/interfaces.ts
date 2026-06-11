import { Analysis } from "@/interfaces/analysis";

export interface GetAnalysesParams {
  _page?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  _limit?: number;
  evaluator?: string;
  q?: string;
}

export type GetAnalysesResponse = Analysis[];

export type GetAnalysisResponse = Analysis;

export type CreateAnalysisRequest = Omit<Analysis, "id">;

export type CreateAnalysisResponse = Analysis;
