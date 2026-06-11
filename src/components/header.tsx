import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, View } from "react-native";

import logo from "@/assets/logo.png";

export function Header() {
  const navigation = useNavigation();

  function handleGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View className="h-[77px] flex-row items-center justify-center border-b border-neutral-200 bg-white px-4">
      <Pressable
        className="absolute left-5 h-10 w-10 items-start justify-center"
        accessibilityLabel="Voltar"
        accessibilityRole="button"
        hitSlop={8}
        onPress={handleGoBack}
      >
        <Ionicons name="chevron-back" size={24} color="#2F2F2F" />
      </Pressable>

      <Image
        className="h-11 w-28"
        resizeMode="contain"
        source={logo}
        accessibilityLabel="Kinebot"
      />
    </View>
  );
}
