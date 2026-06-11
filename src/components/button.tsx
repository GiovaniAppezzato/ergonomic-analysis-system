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
  const isPrimary = variant === "primary";

  return (
    <Pressable
      className={`h-10 flex-row items-center justify-center rounded-md px-4 ${
        isPrimary
          ? "bg-[#2F54EB]"
          : "border border-[#DEDEDE] bg-white"
      } ${isDisabled ? "opacity-60" : "opacity-100"} ${className}`}
      accessibilityRole="button"
      disabled={isDisabled}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator
          color={isPrimary ? "#FFFFFF" : "#3E3E3E"}
          size="small"
        />
      ) : (
        <>
          {icon ? <View className="mr-2">{icon}</View> : null}
          <Text
            className={
              isPrimary
                ? "font-sans-semibold text-base text-white"
                : "font-sans text-sm text-[#3E3E3E]"
            }
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}