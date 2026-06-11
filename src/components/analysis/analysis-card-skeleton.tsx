import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

export function AnalysisCardSkeleton() {
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
    <Animated.View style={{ opacity }}>
      {skeletonItems.map((item) => (
        <View
          key={item}
          className="mb-3.5 h-[65px] flex-row items-center rounded-lg bg-white px-3.5"
        >
          <View className="h-10 w-10 rounded bg-[#ECECEC]" />

          <View className="ml-3.5 flex-1">
            <View className="h-3.5 w-[78%] rounded bg-[#E5E5E5]" />
            <View className="mt-2 h-3 w-20 rounded bg-[#ECECEC]" />
          </View>
        </View>
      ))}
    </Animated.View>
  );
}
