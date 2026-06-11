import { yupResolver } from "@hookform/resolvers/yup";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";

import logo from "@/assets/logo.png";
import SignInDecoration from "@/assets/sign-in-decoration.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/inputs/input";
import { PasswordInput } from "@/components/inputs/password-input";
import { SignInFormData, signInSchema } from "@/schemas/sign-in-schema";
import { showToast } from "@/services/toast";
import { useAuthenticationStore } from "@/stores/authentication";

export default function SignInScreen() {
  const { authenticate } = useAuthenticationStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "teste@kinebot.com.br",
      password: "123456",
      rememberMe: true,
    },
  });

  async function onSubmit(data: SignInFormData) {
    try {
      const authenticated = await authenticate(data);

      if (!authenticated) {
        showToast("E-mail ou senha inválidos");
      }
    } catch {
      console.log("An error occurred while signing in.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#eaeaea]">
      <View
        className="absolute bottom-0 left-0 top-0 w-[211px]"
        pointerEvents="none"
      >
        <SignInDecoration
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin meet"
        />
      </View>

      <View
        className="absolute -right-[45px] top-[180px] h-14 w-56 -rotate-90"
        pointerEvents="none"
      >
        <Image
          className="h-full w-full"
          resizeMode="contain"
          source={logo}
          accessibilityLabel="Kinebot"
        />
      </View>

      <View className="absolute left-24 right-11 top-[49%]">
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="E-mail"
              error={errors.email?.message}
              icon={
                <Ionicons name="person-outline" size={18} color="#666666" />
              }
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Informe seu e-mail"
              accessibilityLabel="E-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View className="mt-5">
          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value } }) => (
              <PasswordInput
                label="Senha"
                error={errors.password?.message}
                icon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#666666"
                  />
                }
                placeholder="••••••••"
                accessibilityLabel="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className="mt-5 flex-row items-center self-start"
              accessibilityRole="checkbox"
              accessibilityState={{ checked: value }}
              onPress={() => onChange(!value)}
            >
              <View
                className={`h-5 w-5 items-center justify-center rounded-sm border ${
                  value
                    ? "border-[#3157E9] bg-[#3157E9]"
                    : "border-neutral-400 bg-white"
                }`}
              >
                {value ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : null}
              </View>
              <Text className="ml-2 font-sans text-sm text-neutral-600">
                Lembrar de mim
              </Text>
            </Pressable>
          )}
        />

        <Button
          className="mt-8"
          label="Login"
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        <Pressable className="mt-8 self-center" accessibilityRole="button">
          <Text className="font-sans text-sm text-[#3157E9]">
            Esqueceu sua senha?
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
