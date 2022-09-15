export type RegisterFormData = {
  name: string;
  email: string;
  cpf: string; // using mask returns a string instead of a number (e.g. "123.456.789-00")
  password: string;
  password_confirmation: string;
  allow_emails: boolean;
  birth_date: Date | null;
};

export type LoginFormData = {
  username: string;
  password: string;
  institution_id: number;
};
