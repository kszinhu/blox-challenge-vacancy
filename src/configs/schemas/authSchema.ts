import { isValidCPF } from "./../../utils/validateCPF";
import { object, string, date, ref, boolean } from "yup";

const signInSchema = object().shape({
  email: string().email("E-mail inválido").required("E-mail obrigatório"),
  password: string().required("Senha obrigatória"),
});

const signUpSchema = object().shape({
  name: string().required("Nome obrigatório"),
  cpf: string()
    .required("CPF obrigatório")
    .test("invalid-cpf", "CPF inválido", (value) => isValidCPF(value!)),
  birthDate: date()
    .required("Data de nascimento obrigatória")
    .test(
      "invalid-date",
      "Data inválida",
      (value) => new Date(value!) < new Date()
      // Date of birth cannot be greater than the current date
    ),
  email: string().email("E-mail inválido").required("E-mail obrigatório"),
  password: string().required("Senha obrigatória"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Senhas não coincidem"
  ),
  allowEmails: boolean(),
});

export { signInSchema, signUpSchema };
