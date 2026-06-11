import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "@/assets/logo.png";
import { useApplicationStore } from "@/stores/application";

export function SplashScreen() {
  const { updateIsLoadingApp } = useApplicationStore();

  useEffect(() => {
    async function init() {
      try {
        // @todo: Check authentication
      } catch (error) {
        // @todo: Handle error
      } finally {
        updateIsLoadingApp(false);
      }
    }

    init();
  }, [updateIsLoadingApp]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-8">
      <Image
        className="h-16 w-64"
        resizeMode="contain"
        source={logo}
        accessibilityLabel="Kinebot"
      />
      <ActivityIndicator className="mt-8" color="#0D3BCB" size="large" />
    </SafeAreaView>
  );
}
