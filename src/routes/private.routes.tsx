import { ComponentType } from "react";
import { Pressable, View } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import EmployeesIcon from "@/assets/icons/employees.svg";
import FilesIcon from "@/assets/icons/files.svg";
import HomeIcon from "@/assets/icons/home.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import HomeScreen from "@/screens/private/home";
import PlaceholderScreen from "@/screens/private/placeholder";

export type PrivateRoutesParamList = {
  Home: undefined;
  Files: undefined;
  Settings: undefined;
  Profile: undefined;
};

interface TabBarIconProps {
  icon: ComponentType<SvgProps>;
  focused: boolean;
  color: string;
}

const Tab = createBottomTabNavigator<PrivateRoutesParamList>();

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

export function PrivateRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomeScreen}
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
        name="Files"
        component={PlaceholderScreen}
        options={{
          tabBarAccessibilityLabel: "Arquivos",
          tabBarIcon: function renderFilesIcon({ color, focused }) {
            return (
              <TabBarIcon icon={FilesIcon} focused={focused} color={color} />
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
