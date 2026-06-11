import moment from "moment";
import { Pressable, Text, View } from "react-native";

import ReportsIcon from "@/assets/icons/reports.svg";
import { Analysis } from "@/interfaces/analysis";

interface AnalysisCardProps {
  analysis: Analysis;
  onPress: () => void;
}

export function AnalysisCard({ analysis, onPress }: AnalysisCardProps) {
  return (
    <Pressable
      className="mb-3.5 h-[65px] flex-row items-center rounded-lg bg-white px-3.5"
      accessibilityLabel={`Abrir detalhes de ${analysis.title}`}
      accessibilityRole="button"
      onPress={onPress}
    >
      <View className="h-10 w-10 items-center justify-center rounded bg-[#F8F8F8]">
        <ReportsIcon width={21} height={21} color="#002FBB" />
      </View>

      <View className="ml-3.5 flex-1">
        <Text
          className="font-sans-semibold text-sm leading-[17px] text-[#262626]"
          numberOfLines={1}
        >
          {analysis.title}
        </Text>
        <Text className="mt-1 font-sans text-sm leading-4 text-[#8C8C8C]">
          {moment(analysis.analysisDate, "YYYY-MM-DD", true).format(
            "DD/MM/YYYY",
          )}
        </Text>
      </View>
    </Pressable>
  );
}
