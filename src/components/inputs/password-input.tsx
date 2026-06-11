import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable } from "react-native";

import { Input, InputProps } from "@/components/inputs/input";

type PasswordInputProps = Omit<InputProps, "rightElement" | "secureTextEntry">;

export function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((currentValue) => !currentValue);
  }

  return (
    <Input
      {...props}
      secureTextEntry={!isPasswordVisible}
      rightElement={
        <Pressable
          accessibilityLabel={
            isPasswordVisible ? "Ocultar senha" : "Exibir senha"
          }
          accessibilityRole="button"
          hitSlop={8}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#8A8A8A"
          />
        </Pressable>
      }
    />
  );
}
