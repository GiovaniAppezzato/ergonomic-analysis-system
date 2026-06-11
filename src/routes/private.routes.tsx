import { ComponentType, useState } from "react";
import { Pressable, View } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmployeesIcon from "@/assets/icons/employees.svg";
import HomeIcon from "@/assets/icons/home.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import { LogoutModal } from "@/components/auth/logout-modal";
import AnalysesScreen from "@/screens/private/analyses";
import AnalysisDetailsScreen from "@/screens/private/analysis-details";
import CreateAnalysisScreen from "@/screens/private/create-analysis";
import EditAnalysisScreen from "@/screens/private/edit-analysis";
import PlaceholderScreen from "@/screens/private/placeholder";
import ProfileScreen from "@/screens/private/profile";
import { showToast } from "@/services/toast";
import { useAuthenticationStore } from "@/stores/authentication";

export type PrivateRoutesParamList = {
  Analyses: undefined;
  Profile: undefined;
  Logout: undefined;
};

export type AnalysesStackParamList = {
  AnalysesList: undefined;
  CreateAnalysis: undefined;
  EditAnalysis: {
    analysisId: string;
  };
  AnalysisDetails: {
    analysisId: string;
  };
};

interface TabBarIconProps {
  icon: ComponentType<SvgProps>;
  focused: boolean;
  color: string;
}

const Tab = createBottomTabNavigator<PrivateRoutesParamList>();
const AnalysesStack = createNativeStackNavigator<AnalysesStackParamList>();

function TabBarIcon({ icon: Icon, focused, color }: TabBarIconProps) {
  return (
    <View
      className={`h-11 w-11 items-center justify-center rounded-sm ${
        focused ? "bg-[#EEF2FF]" : "bg-transparent"
      }`}
    >
      <Icon width={28} height={28} color={color} />
    </View>
  );
}

function TabBarButton({
  children,
  ref: _ref,
  style,
  ...props
}: BottomTabBarButtonProps) {
  return (
    <Pressable {...props} android_ripple={null} style={style}>
      {children}
    </Pressable>
  );
}

function AnalysesRoutes() {
  return (
    <AnalysesStack.Navigator
      initialRouteName="AnalysesList"
      screenOptions={{ headerShown: false }}
    >
      <AnalysesStack.Screen name="AnalysesList" component={AnalysesScreen} />
      <AnalysesStack.Screen
        name="CreateAnalysis"
        component={CreateAnalysisScreen}
      />
      <AnalysesStack.Screen
        name="EditAnalysis"
        component={EditAnalysisScreen}
      />
      <AnalysesStack.Screen
        name="AnalysisDetails"
        component={AnalysisDetailsScreen}
      />
    </AnalysesStack.Navigator>
  );
}

export function PrivateRoutes() {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logout = useAuthenticationStore((state) => state.logout);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      showToast("Não foi possível sair da conta.");
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Analyses"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#002FBB",
          tabBarInactiveTintColor: "#505050",
          tabBarButton: TabBarButton,
          tabBarIconStyle: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarStyle: {
            height: 72,
            paddingHorizontal: 25,
            paddingVertical: 6,
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E8E8E8",
          },
        }}
      >
        <Tab.Screen
          name="Analyses"
          component={AnalysesRoutes}
          options={{
            tabBarAccessibilityLabel: "Início",
            tabBarIcon: function renderHomeIcon({ color, focused }) {
              return (
                <TabBarIcon icon={HomeIcon} focused={focused} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarAccessibilityLabel: "Perfil",
            tabBarIcon: function renderProfileIcon({ color, focused }) {
              return (
                <TabBarIcon
                  icon={EmployeesIcon}
                  focused={focused}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Logout"
          component={PlaceholderScreen}
          listeners={{
            tabPress: (event) => {
              event.preventDefault();
              setIsLogoutModalVisible(true);
            },
          }}
          options={{
            tabBarAccessibilityLabel: "Sair",
            tabBarIcon: function renderLogoutIcon({ color }) {
              return (
                <TabBarIcon icon={LogoutIcon} focused={false} color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>

      <LogoutModal
        isLoading={isLoggingOut}
        visible={isLogoutModalVisible}
        onCancel={() => setIsLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
