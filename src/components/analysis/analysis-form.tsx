import { yupResolver } from "@hookform/resolvers/yup";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/button";
import { Input } from "@/components/inputs/input";
import {
  CreateAnalysisFormData,
  createAnalysisSchema,
} from "@/schemas/create-analysis-schema";

interface AnalysisFormProps {
  defaultValues: CreateAnalysisFormData;
  onCancel: () => void;
  onSubmit: (data: CreateAnalysisFormData) => Promise<void>;
  title: string;
}

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function AnalysisForm({
  defaultValues,
  onCancel,
  onSubmit,
  title,
}: AnalysisFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAnalysisFormData>({
    defaultValues,
    resolver: yupResolver(createAnalysisSchema),
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="my-6 text-center font-sans-semibold text-lg text-[#262626]">
          {title}
        </Text>

        <View className="rounded-xl bg-white px-5 py-6">
          <Controller
            control={control}
            name="title"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                label="Título"
                error={errors.title?.message}
                placeholder="Informe o título da análise"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <View className="mt-4">
            <Controller
              control={control}
              name="company"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Empresa"
                  error={errors.company?.message}
                  placeholder="Informe a empresa"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="industrialPlant"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Planta industrial"
                  error={errors.industrialPlant?.message}
                  placeholder="Informe a planta industrial"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="sector"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Setor"
                  error={errors.sector?.message}
                  placeholder="Informe o setor"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="workstation"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Posto de trabalho"
                  error={errors.workstation?.message}
                  placeholder="Informe o posto de trabalho"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="activity"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Atividade"
                  error={errors.activity?.message}
                  placeholder="Informe a atividade"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="evaluator"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Avaliador"
                  error={errors.evaluator?.message}
                  placeholder="Informe o avaliador"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="analysisDate"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Data da análise"
                  error={errors.analysisDate?.message}
                  placeholder="DD/MM/AAAA"
                  keyboardType="number-pad"
                  maxLength={10}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatDateInput(text))}
                  value={value}
                />
              )}
            />
          </View>

          <Text className="mb-1 mt-7 font-sans-semibold text-base text-[#262626]">
            Resultado da análise
          </Text>
          <Text className="mb-5 font-sans text-xs text-[#8C8C8C]">
            Informe percentuais entre 0 e 100. A soma deve ser igual a 100.
          </Text>

          <Controller
            control={control}
            name="acceptable"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                label="Aceitável (%)"
                error={errors.acceptable?.message}
                placeholder="0"
                keyboardType="number-pad"
                maxLength={3}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <View className="mt-4">
            <Controller
              control={control}
              name="moderate"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Moderado (%)"
                  error={errors.moderate?.message}
                  placeholder="0"
                  keyboardType="number-pad"
                  maxLength={3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="high"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Elevado (%)"
                  error={errors.high?.message}
                  placeholder="0"
                  keyboardType="number-pad"
                  maxLength={3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="veryHigh"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Muito elevado (%)"
                  error={errors.veryHigh?.message}
                  placeholder="0"
                  keyboardType="number-pad"
                  maxLength={3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View className="mt-4">
            <Controller
              control={control}
              name="seriousAndImminent"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Grave e iminente (%)"
                  error={errors.seriousAndImminent?.message}
                  placeholder="0"
                  keyboardType="number-pad"
                  maxLength={3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>

        <View className="mt-5 flex-row gap-4">
          <Button
            className="flex-1"
            disabled={isSubmitting}
            label="Cancelar"
            variant="outline"
            onPress={onCancel}
          />
          <Button
            className="flex-1"
            isLoading={isSubmitting}
            label="Salvar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
