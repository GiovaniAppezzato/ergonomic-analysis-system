import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Routes } from "@/routes";

import "@/styles/global.css";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./src/assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("./src/assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("./src/assets/fonts/Inter_18pt-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <StatusBar style="dark" />

        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
