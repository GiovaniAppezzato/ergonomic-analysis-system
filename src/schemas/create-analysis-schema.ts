import moment from "moment";
import * as yup from "yup";

const percentageSchema = yup
  .string()
  .trim()
  .required("Informe o percentual")
  .matches(/^\d{1,3}$/, "Informe um percentual inteiro")
  .test(
    "percentage-range",
    "O percentual deve estar entre 0 e 100",
    (value) => {
      if (!value || !/^\d{1,3}$/.test(value)) {
        return true;
      }

      const percentage = Number(value);

      return percentage >= 0 && percentage <= 100;
    },
  );

export const createAnalysisSchema = yup
  .object({
    title: yup.string().trim().required("Informe o título"),
    company: yup.string().trim().required("Informe a empresa"),
    industrialPlant: yup
      .string()
      .trim()
      .required("Informe a planta industrial"),
    sector: yup.string().trim().required("Informe o setor"),
    workstation: yup.string().trim().required("Informe o posto de trabalho"),
    activity: yup.string().trim().required("Informe a atividade"),
    evaluator: yup.string().trim().required("Informe o avaliador"),
    analysisDate: yup
      .string()
      .trim()
      .required("Informe a data da análise")
      .test(
        "valid-date",
        "Informe uma data válida no formato DD/MM/AAAA",
        (value) => !value || moment(value, "DD/MM/YYYY", true).isValid(),
      ),
    acceptable: percentageSchema,
    moderate: percentageSchema,
    high: percentageSchema,
    veryHigh: percentageSchema,
    seriousAndImminent: percentageSchema,
  })
  .test(
    "percentage-total",
    "A soma dos percentuais deve ser igual a 100",
    function validatePercentageTotal(values) {
      if (!values) {
        return true;
      }

      const fields = [
        "acceptable",
        "moderate",
        "high",
        "veryHigh",
        "seriousAndImminent",
      ] as const;

      if (fields.some((field) => !/^\d{1,3}$/.test(values[field] ?? ""))) {
        return true;
      }

      const total = fields.reduce(
        (sum, field) => sum + Number(values[field]),
        0,
      );

      if (total === 100) {
        return true;
      }

      return this.createError({
        path: "seriousAndImminent",
        message: "A soma dos percentuais deve ser igual a 100",
      });
    },
  )
  .required();

export type CreateAnalysisFormData = yup.InferType<typeof createAnalysisSchema>;
