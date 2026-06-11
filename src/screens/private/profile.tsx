import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmployeesIcon from "@/assets/icons/employees.svg";
import { Header } from "@/components/header";
import type { PrivateRoutesParamList } from "@/routes/private.routes";
import { useAuthenticationStore } from "@/stores/authentication";

type ProfileScreenProps = BottomTabScreenProps<
  PrivateRoutesParamList,
  "Profile"
>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user } = useAuthenticationStore();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <Header onPress={() => navigation.navigate("Analyses")} />

      <View className="flex-1 px-5 pt-6">
        <Text className="text-center font-sans-semibold text-xl text-[#262626]">
          Perfil
        </Text>

        <View className="mt-8 items-center">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-[#EEF2FF]">
            <EmployeesIcon width={48} height={48} color="#002FBB" />
          </View>
        </View>

        <View className="mt-8 rounded-xl bg-white px-5 py-2">
          <View className="border-b border-[#EEEEEE] py-4">
            <Text className="font-sans text-xs text-[#8C8C8C]">Nome</Text>
            <Text className="mt-1 font-sans text-sm text-[#262626]">
              {user?.name}
            </Text>
          </View>

          <View className="py-4">
            <Text className="font-sans text-xs text-[#8C8C8C]">E-mail</Text>
            <Text className="mt-1 font-sans text-sm text-[#262626]">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
