import moment from "moment";

import { Analysis } from "@/interfaces/analysis";
import { CreateAnalysisFormData } from "@/schemas/create-analysis-schema";
import { CreateAnalysisRequest } from "@/services/api/analysis/interfaces";

export function createAnalysisPayload(
  data: CreateAnalysisFormData,
): CreateAnalysisRequest {
  return {
    title: data.title,
    company: data.company,
    industrialPlant: data.industrialPlant,
    sector: data.sector,
    workstation: data.workstation,
    activity: data.activity,
    evaluator: data.evaluator,
    analysisDate: moment(data.analysisDate, "DD/MM/YYYY", true).format(
      "YYYY-MM-DD",
    ),
    result: [
      {
        key: "acceptable",
        label: "Aceitável",
        color: "#2EAD4B",
        percentage: Number(data.acceptable),
      },
      {
        key: "moderate",
        label: "Moderado",
        color: "#F5B400",
        percentage: Number(data.moderate),
      },
      {
        key: "high",
        label: "Elevado",
        color: "#F2711C",
        percentage: Number(data.high),
      },
      {
        key: "veryHigh",
        label: "Muito elevado",
        color: "#E0301E",
        percentage: Number(data.veryHigh),
      },
      {
        key: "seriousAndImminent",
        label: "Grave e iminente",
        color: "#7E3FF2",
        percentage: Number(data.seriousAndImminent),
      },
    ],
  };
}

export function analysisToFormData(analysis: Analysis): CreateAnalysisFormData {
  function getPercentage(key: Analysis["result"][number]["key"]) {
    return String(
      analysis.result.find((item) => item.key === key)?.percentage ?? 0,
    );
  }

  return {
    title: analysis.title,
    company: analysis.company,
    industrialPlant: analysis.industrialPlant,
    sector: analysis.sector,
    workstation: analysis.workstation,
    activity: analysis.activity,
    evaluator: analysis.evaluator,
    analysisDate: moment(analysis.analysisDate, "YYYY-MM-DD", true).format(
      "DD/MM/YYYY",
    ),
    acceptable: getPercentage("acceptable"),
    moderate: getPercentage("moderate"),
    high: getPercentage("high"),
    veryHigh: getPercentage("veryHigh"),
    seriousAndImminent: getPercentage("seriousAndImminent"),
  };
}
