import * as mockedResponses from "./__mocks__/";

import { APIService } from "..";

describe("APIService", () => {
  describe("Login", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("login with valid credentials should return success", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockedResponses.loginSuccess),
        })
      ) as jest.Mock;

      const response = await APIService.login({
        username: "diana-vantil",
        password: "OwcPBEdqmgLEZJit",
        institution_id: 22,
      });

      expect(response).toHaveProperty("token");
      expect(response).toHaveProperty("expires_at");
    });

    it("login with invalid credentials should return an unauthorized error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 401,
        })
      ) as jest.Mock;

      const response = await APIService.login({
        username: "diana-vantil",
        password: "invalid-password",
        institution_id: 22,
      });

      expect(response).toBeInstanceOf(Error);
    });

    it("login with user not found should return an error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockedResponses.loginFailed),
        })
      ) as jest.Mock;

      const response = await APIService.login({
        username: "another-user-not-found",
        password: "another-password",
        institution_id: 22,
      });

      expect(response).hasOwnProperty("error");
    });
  });

  describe("Register", () => {
    const registerData = {
      username: "diana-vantil",
      password: "OwcPBEdqmgLEZJit",
      institution_id: 22,
      email: "diana-vantil@tuamaeaquelaursa.com",
      password_confirmation: "OwcPBEdqmgLEZJit",
      cpf: "23623347086",
      name: "Diana Vantil",
      birth_date: new Date("1992-12-19"),
      allow_emails: true,
      confirm_success_url: "https://url.com",
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("register with valid data should return success", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockedResponses.registerSuccess),
        })
      ) as jest.Mock;

      const response = await APIService.register(registerData);

      expect(response).toHaveProperty("status", "success");
      expect(response).toHaveProperty("data");
      expect(response).not.toHaveProperty("error");
    });

    it("register with user already registered should return an error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockedResponses.registerFailed),
        })
      ) as jest.Mock;

      const response = await APIService.register(registerData);

      expect(response).toHaveProperty("status", "error");
      expect(response).toHaveProperty("errors");
      expect(
        Object.keys(response.errors!).some((key: string) => key in registerData)
      ).toBe(true);
    });
  });
});
