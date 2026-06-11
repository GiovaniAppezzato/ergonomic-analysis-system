import api from "@/services/api";
import {
  GetAnalysesParams,
  GetAnalysesResponse,
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
}
