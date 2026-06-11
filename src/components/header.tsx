import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";

import logo from "@/assets/logo.png";

interface HeaderProps {
  onPress?: () => void;
}

export function Header({ onPress }: HeaderProps) {
  return (
    <View className="h-[77px] flex-row items-center justify-center border-b border-neutral-200 bg-white px-4">
      {onPress ? (
        <Pressable
          className="absolute left-5 h-10 w-10 items-start justify-center"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onPress}
        >
          <Ionicons name="chevron-back" size={24} color="#2F2F2F" />
        </Pressable>
      ) : null}

      <Image
        className="h-11 w-28"
        resizeMode="contain"
        source={logo}
        accessibilityLabel="Kinebot"
      />
    </View>
  );
}
