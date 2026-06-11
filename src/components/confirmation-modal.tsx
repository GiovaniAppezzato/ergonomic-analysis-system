import { ReactNode } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";

import { Button } from "@/components/button";

interface ConfirmationModalProps {
  confirmLabel: string;
  description: string;
  icon: ReactNode;
  isLoading?: boolean;
  title: string;
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({
  confirmLabel,
  description,
  icon,
  isLoading = false,
  title,
  visible,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent
      visible={visible}
      onRequestClose={isLoading ? undefined : onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <Pressable
          className="absolute inset-0"
          accessibilityLabel="Fechar confirmação"
          accessibilityRole="button"
          disabled={isLoading}
          onPress={onCancel}
        />

        <View className="w-full max-w-[340px] rounded-xl bg-white px-5 pb-5 pt-6">
          <View className="h-12 w-12 items-center justify-center self-center rounded-full bg-[#FFF0F1]">
            {icon}
          </View>

          <Text className="mt-4 text-center font-sans-semibold text-lg text-[#262626]">
            {title}
          </Text>
          <Text className="mt-2 text-center font-sans text-sm leading-5 text-[#666666]">
            {description}
          </Text>

          <View className="mt-6 flex-row gap-3">
            <Button
              className="flex-1"
              disabled={isLoading}
              label="Cancelar"
              variant="outline"
              onPress={onCancel}
            />

            <Pressable
              className={`h-10 flex-1 flex-row items-center justify-center rounded-md bg-[#F02F43] px-4 ${
                isLoading ? "opacity-60" : "opacity-100"
              }`}
              accessibilityRole="button"
              disabled={isLoading}
              onPress={onConfirm}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text className="font-sans-semibold text-base text-white">
                  {confirmLabel}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
