import { APIService, RegisterData, LoginData } from "../../services/Api";
import { Dispatch } from "../AuthContext";

type UserData = {
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
  external_data: {} | null;
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
};

type RegisterResponse = {
  status: string;
  data: UserData;
};

type LoginResponse = {
  status: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
};

async function signUp(dispatch: Dispatch, data: RegisterData) {
  try {
    const response = (await APIService.register(
      data
    )) as unknown as RegisterResponse;

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

async function signIn(dispatch: Dispatch, data: LoginData) {
  try {
    const response = (await APIService.login(data)) as unknown as LoginResponse;

    if (response?.status === "success") {
      dispatch({
        type: "LOGIN_SUCCESS",
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

async function logout(dispatch: Dispatch) {
  dispatch({
    type: "LOGOUT",
  });
}

async function getCurricularUnits(institutionId: number) {
  try {
    const response = await APIService.getCurricularUnits(institutionId);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { signUp, signIn, logout, getCurricularUnits };
