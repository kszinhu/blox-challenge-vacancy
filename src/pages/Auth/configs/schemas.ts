import { isValidCPF } from "../../../utils/validateCPF";
import { object, string, date, ref, boolean } from "yup";

const signInSchema = object().shape({
  username: string().required("Campo obrigatório"),
  password: string().required("Senha obrigatória"),
});

const signUpSchema = object().shape({
  name: string().required("Nome obrigatório"),
  cpf: string()
    .required("CPF obrigatório")
    .test("invalid-cpf", "CPF inválido", (value) => isValidCPF(value!)),
  birth_date: date()
    .nullable() // handle initial value
    .required("Data de nascimento obrigatória")
    .test(
      "invalid-date",
      "Data inválida",
      (value) => new Date(value!) < new Date()
      // Date of birth cannot be greater than the current date
    ),
  email: string().email("E-mail inválido").required("E-mail obrigatório"),
  password: string()
    .min(8, "Senha muito curta")
    .required("Senha obrigatória")
    .test(
      "passwords-requisites",
      "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um digito",
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value!);
        const hasLowerCase = /[a-z]/.test(value!);
        const hasNumber = /\d/.test(value!);

        return hasUpperCase && hasLowerCase && hasNumber;
      }
    ),
  password_confirmation: string().oneOf(
    [ref("password"), null],
    "Senhas não coincidem"
  ),
  allow_emails: boolean(),
});

export { signInSchema, signUpSchema };
