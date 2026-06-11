import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EditIcon from "@/assets/icons/edit.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import { AnalysisDetailsSkeleton } from "@/components/analysis/analysis-details-skeleton";
import { AnalysisResultChart } from "@/components/analysis/analysis-result-chart";
import { Button } from "@/components/button";
import { DeleteAnalysisModal } from "@/components/analysis/delete-analysis-modal";
import { Header } from "@/components/header";
import { useAnalysisData } from "@/hooks/use-analysis-data";
import AnalysisService from "@/services/api/analysis";
import { showToast } from "@/services/toast";
import type { AnalysesStackParamList } from "@/routes/private.routes";

type AnalysisDetailsScreenProps = NativeStackScreenProps<
  AnalysesStackParamList,
  "AnalysisDetails"
>;

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View className="mb-1.5 flex-row">
      <Text className="font-sans-semibold text-sm text-[#262626]">
        {label}:{" "}
      </Text>
      <Text className="flex-1 font-sans text-sm text-[#505050]">{value}</Text>
    </View>
  );
}

export default function AnalysisDetailsScreen({
  navigation,
  route,
}: AnalysisDetailsScreenProps) {
  const { analysis, isLoading } = useAnalysisData(route.params.analysisId);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteAnalysis() {
    setIsDeleting(true);

    try {
      await AnalysisService.deleteAnalysis(route.params.analysisId);

      setIsDeleteModalVisible(false);
      showToast("Análise excluída com sucesso!");
      navigation.reset({
        index: 0,
        routes: [{ name: "AnalysesList" }],
      });
    } catch {
      showToast("Não foi possível excluir a análise.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <Header onPress={navigation.goBack} />

      {isLoading ? (
        <AnalysisDetailsSkeleton />
      ) : analysis ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-7"
          showsVerticalScrollIndicator={false}
        >
          <Text className="my-6 text-center font-sans-semibold text-lg text-[#262626]">
            {analysis.title}
          </Text>

          <View className="rounded-xl bg-white px-5 py-6">
            <DetailRow label="Empresa" value={analysis.company} />
            <DetailRow
              label="Planta industrial"
              value={analysis.industrialPlant}
            />
            <DetailRow label="Setor" value={analysis.sector} />
            <DetailRow label="Posto de trabalho" value={analysis.workstation} />
            <DetailRow label="Atividade" value={analysis.activity} />
            <DetailRow label="Avaliador" value={analysis.evaluator} />
            <DetailRow
              label="Data de análise"
              value={moment(analysis.analysisDate, "YYYY-MM-DD", true).format(
                "DD/MM/YYYY",
              )}
            />

            <Text className="mt-6 font-sans-semibold text-sm text-[#262626]">
              Resultado da análise
            </Text>

            <AnalysisResultChart result={analysis.result} />
          </View>

          <View className="mt-5 flex-row gap-4">
            <Button
              className="flex-1"
              accessibilityLabel="Editar análise"
              icon={<EditIcon width={19} height={19} color="#003CD2" />}
              label="Editar"
              variant="outline"
              onPress={() =>
                navigation.navigate("EditAnalysis", {
                  analysisId: analysis.id,
                })
              }
            />

            <Button
              className="flex-1"
              accessibilityLabel="Excluir análise"
              icon={<TrashIcon width={19} height={19} color="#F02F43" />}
              label="Excluir"
              variant="outline"
              onPress={() => setIsDeleteModalVisible(true)}
            />
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center font-sans text-sm text-[#8C8C8C]">
            Não foi possível exibir os dados da análise.
          </Text>
        </View>
      )}

      <DeleteAnalysisModal
        isLoading={isDeleting}
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteAnalysis}
      />
    </SafeAreaView>
  );
}
