import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "@/screens/public/sign-in";

export type PublicStackParamList = {
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
