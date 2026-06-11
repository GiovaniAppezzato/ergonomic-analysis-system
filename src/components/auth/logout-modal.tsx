import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";

import LogoutIcon from "@/assets/icons/logout.svg";
import { Button } from "@/components/button";

interface LogoutModalProps {
  isLoading?: boolean;
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutModal({
  isLoading = false,
  visible,
  onCancel,
  onConfirm,
}: LogoutModalProps) {
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
            <LogoutIcon width={24} height={24} color="#F02F43" />
          </View>

          <Text className="mt-4 text-center font-sans-semibold text-lg text-[#262626]">
            Sair da conta?
          </Text>
          <Text className="mt-2 text-center font-sans text-sm leading-5 text-[#666666]">
            Tem certeza de que deseja sair da sua conta?
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
                  Sair
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
