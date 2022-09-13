import { endpoints } from "../configs/endpoints";

export interface RegisterData {
  institution_id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  cpf: string;
  birth_date: string;
  allow_emails: boolean;
  confirm_success_url: string;
}

export interface LoginData {
  username: string;
  password: string;
  institution_id: number;
}

export class APIService {
  #baseUrl = import.meta.env.VITE_AUTH_API_URL;

  static register(_data: any) {
    throw new Error("Method not implemented.");
  }

  static login(_credentials: any) {
    throw new Error("Method not implemented.");
  }

  static getCurricularUnits(_institutionId: number) {
    throw new Error("Method not implemented.");
  }

  async register(data: RegisterData): Promise<any> {
    const response = await fetch(`${this.#baseUrl}${endpoints.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async login(credentials: LoginData): Promise<any> {
    const response = await fetch(`${this.#baseUrl}${endpoints.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // if success and return token, save token in localStorage

    return response.json();
  }

  async getCurricularUnits(institutionId: number): Promise<any> {
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
