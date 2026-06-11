import { useCallback, useEffect, useState } from "react";

import { Analysis } from "@/interfaces/analysis";
import AnalysisService from "@/services/api/analysis";
import { showToast } from "@/services/toast";

export function useAnalysesData() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalyses = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await AnalysisService.getAnalyses({
        _sort: "analysisDate",
        _order: "desc",
      });

      setAnalyses(data);
    } catch {
      showToast("Não foi possível carregar as análises.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalyses();
  }, [loadAnalyses]);

  return { analyses, isLoading };
}