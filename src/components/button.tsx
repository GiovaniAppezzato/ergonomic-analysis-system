import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  isLoading?: boolean;
}

export function Button({
  label,
  variant = "primary",
  icon,
  isLoading = false,
  disabled,
  className = "",
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const isOutline = variant === "outline";

  return (
    <Pressable
      className={`flex-row items-center justify-center ${
        isOutline
          ? "h-10 rounded-md border border-[#DEDEDE] bg-white px-2.5"
          : "h-10 rounded-md bg-[#3157E9]"
      } ${isDisabled ? "opacity-60" : "opacity-100"} ${className}`}
      accessibilityRole="button"
      disabled={isDisabled}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator
          color={isOutline ? "#3E3E3E" : "#FFFFFF"}
          size="small"
        />
      ) : (
        <>
          {icon ? <View className="mr-3">{icon}</View> : null}
          <Text
            className={
              isOutline
                ? "font-sans text-sm text-[#3E3E3E]"
                : "font-sans-semibold text-base text-white"
            }
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
