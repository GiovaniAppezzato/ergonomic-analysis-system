import { useCallback, useEffect, useState } from "react";

import { Analysis } from "@/interfaces/analysis";
import AnalysisService from "@/services/api/analysis";
import { showToast } from "@/services/toast";

export function useAnalysisData(id: string) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalysis = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await AnalysisService.getAnalysis(id);

      setAnalysis(data);
    } catch {
      showToast("Não foi possível carregar a análise.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAnalysis();
  }, [loadAnalysis]);

  return { analysis, isLoading };
}
