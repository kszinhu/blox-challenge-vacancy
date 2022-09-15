import { endpoints } from "../configs/endpoints";
import {
  LoginFormData,
  RegisterFormData as RegisterFormInterface,
} from "../pages/Auth/configs/types";

interface RegisterFormData extends RegisterFormInterface {
  username: string;
  institution_id: number;
  confirm_success_url: string;
}

interface RegisterData {
  id: number | null;
  provider: string;
  uid: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
  institution_id: number;
  picture_data: string | null;
  name: string;
  username: string;
  external_data: object;
  status: "active" | "inactive";
  shortbio: string | null;
  lattes_curriculum: string | null;
  linked_in: string | null;
  external_id: string | null;
  token: string | null;
  unit_id: number | null;
  cpf: string;
  rg: string | null;
  phone: string | null;
  birth_date: string | Date | null;
  phone2: string | null;
  allow_emails: boolean;
  ecommerce_user: boolean;
}

interface LoginData {
  token: string;
  expires_at: string;
  user_id: number;
}

type RegisterResponse = {
  status: "success" | "error";
  errors?: object;
  data: RegisterData;
};

type LoginResponse = { error: string } | LoginData;

export class APIService {
  static #baseUrl: string = import.meta.env.VITE_AUTH_API_URL;

  static async register(data: RegisterFormData): Promise<RegisterResponse> {
    const response = await fetch(`${this.#baseUrl}${endpoints.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  static async login(credentials: LoginFormData): Promise<LoginResponse> {
    const response = await fetch(`${this.#baseUrl}${endpoints.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return await response.json();
  }

  static async getCurricularUnits(institutionId: number): Promise<any> {
    const response = await fetch(
      `${this.#baseUrl}${endpoints.curricularUnits.replace(
        "{institutionId}",
        String(institutionId)
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  }
}
