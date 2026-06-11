import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddIcon from "@/assets/icons/add.svg";
import { AnalysisCardSkeleton } from "@/components/analysis/analysis-card-skeleton";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { useAnalysesData } from "@/hooks/use-analyses-data";
import type { AnalysesStackParamList } from "@/routes/private.routes";

type AnalysesScreenProps = NativeStackScreenProps<
  AnalysesStackParamList,
  "AnalysesList"
>;

export default function AnalysesScreen({ navigation }: AnalysesScreenProps) {
  const { analyses, isLoading } = useAnalysesData();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <Header />

      <FlatList
        className="flex-1"
        contentContainerClassName="px-[19px]"
        data={analyses}
        keyExtractor={(analysis) => analysis.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text className="my-6 text-center font-sans-semibold text-[20px] text-[#262626]">
              AEP
            </Text>

            <View className="mb-4 flex-row items-center justify-between">
              {isLoading ? (
                <View className="h-3 w-16 rounded bg-[#E5E5E5]" />
              ) : (
                <Text className="font-sans text-xs text-[#8C8C8C]">
                  {analyses.length}{" "}
                  {analyses.length === 1 ? "relatório" : "relatórios"}
                </Text>
              )}

              <Button
                accessibilityLabel="Criar nova análise"
                icon={<AddIcon width={20} height={20} color="#333333" />}
                label="Nova análise"
                variant="outline"
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <AnalysisCardSkeleton />
          ) : (
            <View className="items-center px-8 py-12">
              <Text className="text-center font-sans text-sm text-[#8C8C8C]">
                Nenhum relatório encontrado.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <AnalysisCard
            analysis={item}
            onPress={() =>
              navigation.navigate("AnalysisDetails", {
                analysisId: item.id,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
