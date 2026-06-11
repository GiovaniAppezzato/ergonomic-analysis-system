import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnalysisForm } from "@/components/analysis/analysis-form";
import { Header } from "@/components/header";
import { CreateAnalysisFormData } from "@/schemas/create-analysis-schema";
import AnalysisService from "@/services/api/analysis";
import { showToast } from "@/services/toast";
import type { AnalysesStackParamList } from "@/routes/private.routes";
import { createAnalysisPayload } from "@/utils/create-analysis-payload";

type CreateAnalysisScreenProps = NativeStackScreenProps<
  AnalysesStackParamList,
  "CreateAnalysis"
>;

const defaultValues: CreateAnalysisFormData = {
  title: "",
  company: "",
  industrialPlant: "",
  sector: "",
  workstation: "",
  activity: "",
  evaluator: "",
  analysisDate: "",
  acceptable: "",
  moderate: "",
  high: "",
  veryHigh: "",
  seriousAndImminent: "",
};

export default function CreateAnalysisScreen({
  navigation,
}: CreateAnalysisScreenProps) {
  async function onSubmit(data: CreateAnalysisFormData) {
    try {
      await AnalysisService.createAnalysis(createAnalysisPayload(data));

      showToast("Sua análise foi criada com sucesso!");

      navigation.reset({
        index: 0,
        routes: [{ name: "AnalysesList" }],
      });
    } catch {
      showToast("Não foi possível criar a análise.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <Header onPress={navigation.goBack} />
      <AnalysisForm
        defaultValues={defaultValues}
        title="Nova análise"
        onCancel={navigation.goBack}
        onSubmit={onSubmit}
      />
    </SafeAreaView>
  );
}
