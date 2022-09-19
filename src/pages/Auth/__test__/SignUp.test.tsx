import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "../../../contexts/AuthContext";
import {
  registerSuccess,
  registerFailed,
} from "../../../services/api/__tests__/__mocks__";

import { Register, Login } from "../..";

global.React = React;

const mockEnqueue = jest.fn();
jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe("<Register />", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <SnackbarProvider maxSnack={5}>
          <MemoryRouter initialEntries={["/register"]}>
            <Routes>
              <Route path='/sign-in' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </MemoryRouter>
        </SnackbarProvider>
      </AuthProvider>
    );
  });

  it("should render the page", () => {
    const textBoxFields: string[] = [
      "Nome",
      "CPF",
      "Data de Nascimento",
      "E-mail",
    ];

    const fields = screen.getAllByRole("textbox"),
      passwordField = screen.getByLabelText(/Crie sua senha/i),
      confirmPasswordField = screen.getByLabelText(/Confirme sua senha/i);

    expect(fields.length).toBe(textBoxFields.length);
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();
  });

  describe("when the user types in the fields", () => {
    it("should show an error message when the password doesn't contain the requirements", async () => {
      const passwordField = screen.getByLabelText(/Crie sua senha/i);

      await userEvent.type(passwordField, "12345678");
      await userEvent.tab();

      expect(screen.getByText(/Senha deve conter/i)).toBeInTheDocument();
    });

    it("should show an error message when the password and confirm password fields do not match", async () => {
      const user = userEvent.setup(),
        passwordField = screen.getByLabelText(/Crie sua senha/i),
        confirmPasswordField = screen.getByLabelText(/Confirme sua senha/i);

      await user.type(passwordField, "zIx6p;VChTtuaj-5");
      await user.type(confirmPasswordField, "zIx6p;VChTtuaj-6");

      expect(passwordField).toHaveValue("zIx6p;VChTtuaj-5");
      expect(confirmPasswordField).toHaveValue("zIx6p;VChTtuaj-6");
      expect(screen.getByText(/Senhas não coincidem/i)).toBeInTheDocument();
    });
  });

  describe("when the form is submitted", () => {
    beforeEach(async () => {
      const user = userEvent.setup(),
        nameField = screen.getByRole("textbox", { name: /Nome/i }),
        cpfField = screen.getByLabelText(/CPF/i),
        birthDateField = screen.getByLabelText(/Data de Nascimento/i),
        emailField = screen.getByRole("textbox", { name: /E-mail/i }),
        passwordField = screen.getByLabelText(/Crie sua senha/i),
        confirmPasswordField = screen.getByLabelText(/Confirme sua senha/i),
        submitButton = screen.getByRole("button", { name: /Cadastrar/i });

      await user.type(nameField, "John Doe");
      await user.type(cpfField, "80875197019");
      await user.type(birthDateField, "01/01/2000");
      await user.type(emailField, "marina-chagas@tuamaeaquelaursa.com");
      await user.type(passwordField, "zIx6p;VChTtuaj-5");
      await user.type(confirmPasswordField, "zIx6p;VChTtuaj-5");
      await user.click(submitButton);
    });

    describe("when the request is successful", () => {
      beforeAll(async () => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(registerSuccess),
          })
        ) as jest.Mock;
      });

      it("should show snackbar success message", () => {
        expect(mockEnqueue).toHaveBeenCalledWith(
          "Cadastro realizado com sucesso!",
          {
            variant: "success",
            autoHideDuration: 1500,
          }
        );
      });
    });

    describe("when the request is failed", () => {
      beforeAll(async () => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(registerFailed),
          })
        ) as jest.Mock;
      });

      it("should show snackbar success message", () => {
        expect(mockEnqueue).toHaveBeenCalledWith("Erro ao realizar cadastro!", {
          variant: "error",
          autoHideDuration: 1500,
        });
      });
    });

    it("should redirect to login page", () => {
      setTimeout(() => {
        expect(screen.getByText(/Painel de Acesso/i)).toBeInTheDocument();
      }, 1500);
    });
  });
});
