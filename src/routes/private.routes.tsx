import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@/screens/private/home";

export type PrivateStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export function PrivateRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
