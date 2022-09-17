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
import { LoginFormData } from "../configs/types";
import { signInSchema } from "../configs/schemas";

import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { signIn } from "../../../contexts/actions/UserActions";

export default function SignIn() {
  const navigate = useNavigate(),
    { dispatch } = useAuth()!,
    { enqueueSnackbar } = useSnackbar(),
    {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: yupResolver(signInSchema),
      mode: "onBlur",
    });

  const onSubmit: SubmitHandler<LoginFormData> = async (values) => {
    await signIn(dispatch, values);
    if (localStorage.getItem("access_token")) {
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
        autoHideDuration: 2000,
      });

      setTimeout(() => {
        navigate("/curricular-units");
      }, 750);
    } else {
      enqueueSnackbar("Erro ao realizar login!", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
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
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("username")}
            margin='dense'
            required
            fullWidth
            id='username'
            label='Nome de usuário'
            variant='outlined'
            autoComplete='username'
            error={!!errors.username}
            helperText={errors.username?.message}
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
