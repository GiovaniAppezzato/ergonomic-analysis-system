import * as yup from "yup";

export const signInSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email("Informe um e-mail válido")
      .required("Informe o e-mail"),
    password: yup.string().required("Informe a senha"),
    rememberMe: yup.boolean().required(),
  })
  .required();

export type SignInFormData = yup.InferType<typeof signInSchema>;
