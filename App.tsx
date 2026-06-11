import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Routes } from "@/routes";

import "@/styles/global.css";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
