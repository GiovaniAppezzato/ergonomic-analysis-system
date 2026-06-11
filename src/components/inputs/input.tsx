import { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export function Input({
  label,
  error,
  icon,
  rightElement,
  className,
  ...textInputProps
}: InputProps) {
  return (
    <View>
      {label ? (
        <Text className="mb-2 font-sans-semibold text-base text-[#262626]">
          {label}
        </Text>
      ) : null}

      <View
        className={`h-11 flex-row items-center rounded-md border bg-white px-3 ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
      >
        {icon}

        <TextInput
          className={`${icon ? "ml-2" : ""} h-full flex-1 py-0 font-sans text-base text-[#262626] ${className ?? ""}`}
          placeholderTextColor="#737373"
          {...textInputProps}
        />

        {rightElement}
      </View>

      {error ? (
        <Text className="mt-1 font-sans text-sm text-red-600">{error}</Text>
      ) : null}
    </View>
  );
}
