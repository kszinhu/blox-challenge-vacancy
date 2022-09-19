import { endpoints } from "../../configs/endpoints";
import { LoginFormData } from "../../pages/Auth/configs/types";
import {
  RegisterFormData,
  LoginResponse,
  RegisterResponse,
  CurricularUnitResponse,
} from "./types";

interface CurricularUnitOptions {
  institution_id: number;
  page: string;
  per: string;
  title?: string;
}

export class APIService {
  static #baseUrl: string = import.meta.env.VITE_ENTRYPOINT_API_URL;

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
    try {
      const response = await fetch(`${this.#baseUrl}${endpoints.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      return await response.json();
    } catch (error: any) {
      return error;
    }
  }

  static async getCurricularUnits({
    institution_id,
    ...queryParams
  }: CurricularUnitOptions): Promise<CurricularUnitResponse> {
    const url = new URL(
      `${this.#baseUrl}${endpoints.curricularUnits}`.replace(
        "{institutionId}",
        String(institution_id)
      )
    );

    // filter out undefined | '' | null values and remove trim spaces
    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams)
        .filter(([, value]) => value)
        .map(([key, value]) => [key, value?.toString().trim()])
    );

    url.search = new URLSearchParams(filteredQueryParams).toString();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }
}
