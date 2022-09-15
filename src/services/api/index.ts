import { endpoints } from "../../configs/endpoints";
import { LoginFormData } from "../../pages/Auth/configs/types";
import {
  RegisterFormData,
  LoginResponse,
  RegisterResponse,
  CurricularUnitResponse,
} from "./types";

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

  static async getCurricularUnits(
    institutionId: number,
    paginationOptions: { page: string; per_page: string }
  ): Promise<CurricularUnitResponse> {
    const url = new URL(`${this.#baseUrl}${endpoints.curricularUnits}`);
    url.search = new URLSearchParams(paginationOptions).toString();

    const response = await fetch(
      url.toString().replace("{institutionId}", String(institutionId)),
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
