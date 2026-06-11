import { ComponentType } from "react";
import { Pressable, View } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmployeesIcon from "@/assets/icons/employees.svg";
import FilesIcon from "@/assets/icons/files.svg";
import HomeIcon from "@/assets/icons/home.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import AnalysesScreen from "@/screens/private/analyses";
import AnalysisDetailsScreen from "@/screens/private/analysis-details";
import CreateAnalysisScreen from "@/screens/private/create-analysis";
import PlaceholderScreen from "@/screens/private/placeholder";

export type PrivateRoutesParamList = {
  Analyses: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type AnalysesStackParamList = {
  AnalysesList: undefined;
  CreateAnalysis: undefined;
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
        name="AnalysisDetails"
        component={AnalysisDetailsScreen}
      />
    </AnalysesStack.Navigator>
  );
}

export function PrivateRoutes() {
  return (
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
        name="Settings"
        component={PlaceholderScreen}
        options={{
          tabBarAccessibilityLabel: "Configurações",
          tabBarIcon: function renderSettingsIcon({ color, focused }) {
            return (
              <TabBarIcon icon={SettingsIcon} focused={focused} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
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
    </Tab.Navigator>
  );
}
