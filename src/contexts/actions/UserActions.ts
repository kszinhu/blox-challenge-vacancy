import { isAuthenticated } from "../AuthContext";
import { Dispatch } from "../types";
import {
  RegisterFormData,
  LoginFormData,
} from "../../pages/Auth/configs/types";
import { APIService } from "../../services/api";

import { AuthActions } from "../reducers/AuthReducer";

interface UserData {
  id: number;
  provider: string;
  uid: string;
  email: string;
  created_at: string;
  updated_at: string;
  institution_id: number;
  picture_data: string | null;
  name: string;
  username: string;
  external_data: object | null;
  status: string;
  shortbio: string | null;
  lattes_curriculum: string | null;
  linked_in: null;
  external_id: string | null;
  token: string | null;
  unit_id: number | null;
  cpf: string;
  rg: string | null;
  phone: string | null;
  birth_date: string | null;
  phone2: string | null;
  allow_emails: boolean;
  ecommerce_user: boolean;
  allow_password_change: boolean;
}

type RegisterResponse = {
  status: string;
  data: UserData;
};

interface LoginResponse {
  status: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

async function signUp(dispatch: Dispatch<AuthActions>, data: RegisterFormData) {
  try {
    const response = await APIService.register({
      ...data,
      cpf: data.cpf.replace(/[^\d]/g, ""),
      username: data.email.split("@")[0],
      institution_id: 22,
      confirm_success_url: window.location.href,
    });

    if (response?.status === "success") {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data,
      });
    } else {
      dispatch({
        type: "ERROR",
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error,
    });
  }
}

async function signIn(
  dispatch: Dispatch<AuthActions>,
  credentials: LoginFormData
) {
  try {
    const data = await APIService.login({ ...credentials, institution_id: 22 });

    if ("error" in data) {
      dispatch({
        type: "ERROR",
        payload: data.error!,
      });
    } else {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("expires_at", data.expires_at);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error,
    });
  }
}

async function logout(dispatch: Dispatch<AuthActions>) {
  dispatch({
    type: "LOGOUT",
  });
}

export { signUp, signIn, logout };
