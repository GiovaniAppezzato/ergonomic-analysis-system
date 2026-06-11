import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const detailRows = Array.from({ length: 7 }, (_, index) => index);

export function AnalysisDetailsSkeleton() {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          duration: 700,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          duration: 700,
          toValue: 0.45,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View className="px-5" style={{ opacity }}>
      <View className="mx-auto mt-7 h-5 w-[82%] rounded bg-[#E4E4E4]" />

      <View className="mt-6 rounded-xl bg-white px-5 py-6">
        {detailRows.map((row) => (
          <View key={row} className="mb-3 flex-row">
            <View className="h-3.5 w-24 rounded bg-[#E5E5E5]" />
            <View className="ml-2 h-3.5 flex-1 rounded bg-[#EEEEEE]" />
          </View>
        ))}

        <View className="mt-5 h-4 w-36 rounded bg-[#E5E5E5]" />

        <View className="mt-6 flex-row items-center">
          <View className="h-[148px] w-[148px] rounded-full bg-[#E5E5E5]" />

          <View className="ml-5 flex-1">
            {Array.from({ length: 5 }, (_, index) => (
              <View key={index} className="mb-3 flex-row items-center">
                <View className="h-3.5 w-3.5 rounded bg-[#E2E2E2]" />
                <View className="ml-2.5 h-3 w-24 rounded bg-[#ECECEC]" />
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-5 flex-row gap-4">
        <View className="h-10 flex-1 rounded bg-[#E5E5E5]" />
        <View className="h-10 flex-1 rounded bg-[#E5E5E5]" />
      </View>
    </Animated.View>
  );
}
