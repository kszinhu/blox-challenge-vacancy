import {
  Divider,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../configs/schemas/authSchema";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormData> = (values) => {
    console.log(values);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h4' sx={{ fontWeight: "bold" }}>
          Seja bem-vindo!
        </Typography>
        <Divider sx={{ width: "100%", my: 2 }}>
          <Typography component='h2' variant='h6'>
            Painel de Acesso
          </Typography>
        </Divider>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            {...register("email")}
            margin='dense'
            required
            fullWidth
            id='email'
            label='Email Address'
            variant='outlined'
            autoComplete='email'
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            margin='dense'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            variant='outlined'
            autoComplete='current-password'
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Stack direction='row' spacing={2} mt={2}>
            <Button onClick={() => navigate(-1)} fullWidth variant='contained'>
              Voltar
            </Button>
            <Button type='submit' fullWidth variant='contained'>
              Acessar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
