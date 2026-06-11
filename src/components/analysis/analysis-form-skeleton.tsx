import { useEffect, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";

const formRows = Array.from({ length: 13 }, (_, index) => index);

export function AnalysisFormSkeleton() {
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
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-5 pb-8"
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity }}>
        <View className="mx-auto my-6 h-5 w-36 rounded bg-[#E4E4E4]" />

        <View className="rounded-xl bg-white px-5 py-6">
          {formRows.map((row) => (
            <View key={row} className={row === 0 ? "" : "mt-4"}>
              <View className="mb-2 h-4 w-32 rounded bg-[#E5E5E5]" />
              <View className="h-11 rounded-md bg-[#EEEEEE]" />
            </View>
          ))}
        </View>

        <View className="mt-5 flex-row gap-4">
          <View className="h-10 flex-1 rounded-md bg-[#E5E5E5]" />
          <View className="h-10 flex-1 rounded-md bg-[#E5E5E5]" />
        </View>
      </Animated.View>
    </ScrollView>
  );
}
