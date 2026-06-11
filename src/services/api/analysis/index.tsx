import api from "@/services/api";
import {
  CreateAnalysisRequest,
  CreateAnalysisResponse,
  GetAnalysisResponse,
  GetAnalysesParams,
  GetAnalysesResponse,
  UpdateAnalysisRequest,
  UpdateAnalysisResponse,
} from "@/services/api/analysis/interfaces";

export default class AnalysisService {
  static async getAnalyses(
    params?: GetAnalysesParams,
  ): Promise<GetAnalysesResponse> {
    const { data } = await api.get<GetAnalysesResponse>("/analyses", {
      params,
    });

    return data;
  }

  static async getAnalysis(id: string): Promise<GetAnalysisResponse> {
    const { data } = await api.get<GetAnalysisResponse>(`/analyses/${id}`);

    return data;
  }

  static async createAnalysis(
    payload: CreateAnalysisRequest,
  ): Promise<CreateAnalysisResponse> {
    const { data } = await api.post<CreateAnalysisResponse>(
      "/analyses",
      payload,
    );

    return data;
  }

  static async updateAnalysis(
    id: string,
    payload: UpdateAnalysisRequest,
  ): Promise<UpdateAnalysisResponse> {
    const { data } = await api.put<UpdateAnalysisResponse>(
      `/analyses/${id}`,
      payload,
    );

    return data;
  }
}
