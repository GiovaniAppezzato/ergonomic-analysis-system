import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnalysisFormSkeleton } from "@/components/analysis/analysis-form-skeleton";
import { AnalysisForm } from "@/components/analysis/analysis-form";
import { Header } from "@/components/header";
import { useAnalysisData } from "@/hooks/use-analysis-data";
import { CreateAnalysisFormData } from "@/schemas/create-analysis-schema";
import AnalysisService from "@/services/api/analysis";
import { showToast } from "@/services/toast";
import type { AnalysesStackParamList } from "@/routes/private.routes";
import {
  analysisToFormData,
  createAnalysisPayload,
} from "@/utils/create-analysis-payload";

type EditAnalysisScreenProps = NativeStackScreenProps<
  AnalysesStackParamList,
  "EditAnalysis"
>;

export default function EditAnalysisScreen({
  navigation,
  route,
}: EditAnalysisScreenProps) {
  const { analysis, isLoading } = useAnalysisData(route.params.analysisId);

  async function onSubmit(data: CreateAnalysisFormData) {
    try {
      await AnalysisService.updateAnalysis(
        route.params.analysisId,
        createAnalysisPayload(data),
      );

      showToast("Análise atualizada com sucesso!");
      navigation.reset({
        index: 1,
        routes: [
          { name: "AnalysesList" },
          {
            name: "AnalysisDetails",
            params: { analysisId: route.params.analysisId },
          },
        ],
      });
    } catch {
      showToast("Não foi possível atualizar a análise.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <Header onPress={navigation.goBack} />

      {isLoading ? (
        <AnalysisFormSkeleton />
      ) : analysis ? (
        <AnalysisForm
          defaultValues={analysisToFormData(analysis)}
          title="Editar análise"
          onCancel={navigation.goBack}
          onSubmit={onSubmit}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center font-sans text-sm text-[#8C8C8C]">
            Não foi possível exibir os dados da análise.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
