import {
  Checkbox,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
} from "@mui/material";
import InputMask from "react-input-mask";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../configs/schemas/authSchema";

type RegisterFormData = {
  name: string;
  email: string;
  cpf: string; // using mask returns a string instead of a number (e.g. "123.456.789-00")
  password: string;
  confirmPassword: string;
  allowEmails: boolean;
  birthDate: Date | null;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: undefined,
      email: undefined,
      cpf: undefined,
      password: undefined,
      confirmPassword: undefined,
      allowEmails: false,
      birthDate: null,
    },
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (values) => {
    console.log(values);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginY: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5' sx={{ fontWeight: "bold" }}>
          Quero me cadastrar!
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("name")}
            margin='dense'
            required
            fullWidth
            id='name'
            label='Nome'
            variant='outlined'
            error={!!errors.name}
            helperText={errors.name?.message}
            inputProps={{
              "aria-describedby": "insira seu nome",
            }}
          />
          <Stack direction='row' alignItems='flex-start' spacing={2}>
            <Controller
              name='cpf'
              control={control}
              render={({ field }: any) => (
                <InputMask
                  mask='999.999.999-99'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <TextField
                    margin='dense'
                    required
                    fullWidth
                    id='cpf'
                    label='CPF'
                    variant='outlined'
                    autoComplete='off'
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    inputProps={{
                      "aria-describedby": "insira seu CPF",
                    }}
                  />
                </InputMask>
              )}
            />
            <Controller
              name='birthDate'
              control={control}
              render={({ field }: any) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label='Data de nascimento'
                    value={field.value}
                    inputFormat='dd/MM/yyyy'
                    onChange={(newValue: Date | null) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        margin='dense'
                        id='birthDate'
                        required
                        fullWidth
                        variant='outlined'
                        style={{ marginTop: "8px" }}
                        error={!!errors.birthDate}
                        helperText={
                          errors.birthDate?.message && "Data Inválida"
                        }
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Stack>
          <TextField
            {...register("email")}
            margin='dense'
            required
            fullWidth
            id='email'
            label='E-mail'
            variant='outlined'
            autoComplete='email'
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{
              "aria-describedby": "insira o seu email",
            }}
          />
          <TextField
            {...register("password")}
            margin='dense'
            required
            fullWidth
            label='Crie sua senha'
            type='password'
            variant='outlined'
            autoComplete='current-password'
            error={!!errors.password}
            helperText={errors.password?.message}
            inputProps={{
              "aria-describedby": "insira uma senha para o seu cadastro",
            }}
          />
          <TextField
            {...register("confirmPassword")}
            margin='dense'
            required
            fullWidth
            label='Confirme sua senha'
            type='password'
            variant='outlined'
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            inputProps={{
              "aria-describedby": "insira a senha novamente",
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("allowEmails")}
                inputProps={{ "aria-label": "allow-emails" }}
              />
            }
            label='Você aceita receber comunicações por e-mail?'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            startIcon={<DescriptionOutlinedIcon />}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
