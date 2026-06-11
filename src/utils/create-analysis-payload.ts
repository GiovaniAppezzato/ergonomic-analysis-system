import moment from "moment";

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
