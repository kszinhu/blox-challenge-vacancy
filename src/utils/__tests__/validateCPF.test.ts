import { isValidCPF } from "../validateCPF";

describe("isValidCPF", () => {
  it("should return false when CPF is invalid", () => {
    expect(isValidCPF("123.456.789-00")).toBe(false);
    expect(isValidCPF("12345678900")).toBe(false);
  });

  it("should return true when CPF is valid", () => {
    expect(isValidCPF("112.894.490-15")).toBe(true);
    expect(isValidCPF("11289449015")).toBe(true);
  });
});
