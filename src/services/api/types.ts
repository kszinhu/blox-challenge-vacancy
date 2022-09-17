import { RegisterFormData as RegisterFormInterface } from "../../pages/Auth/configs/types";

export interface RegisterFormData extends RegisterFormInterface {
  username: string;
  institution_id: number;
  confirm_success_url: string;
}

export interface RegisterData {
  id: number | null;
  provider: string;
  uid: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
  institution_id: number;
  picture_data: object | null;
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

export interface CachedBlox {
  id: number;
  url: string | null;
  code: number;
  hours: number;
  pages: number | null;
  title: string;
  total: number | null;
  legacy: boolean;
  status: "accepted" | "rejected" | "pending";
  tracks: any[];
  credits: number | null;
  program: null;
  modality: string;
  subtitle: string;
  video_url: string;
  created_at: string;
  objectives: JSON;
  updated_at: string;
  competences: {
    id: number;
    name: string;
    icon_url: string;
    description: string;
  }[];
  external_id: string;
  modality_id: number;
  responsible: {
    id: number;
    name: string;
    email: string;
    shortbio: string;
    username: string;
    picture_url: string | null;
  };
  blox_classes: {
    id: number;
    order: number;
    blox_id: number;
    context: string;
    question: string;
    methodology: {
      id: number;
      name: string;
      icon_data: object | null;
      created_at: string;
      updated_at: string;
      external_data: object | null;
      material_icon: string | null;
      institution_id: number;
    };
    preparation: string;
    extra_fields: any[];
    methodology_id: number;
    blox_class_attachments_attributes: any[];
  }[];
  blox_profile: {
    id: number;
    name: string;
    icon_url: string | null;
    description: string;
    icon_dark_url: string | null;
    material_icon: string | null;
  };
  extra_fields: any[];
  blow_template: object | null;
  knowledge_area: {
    id: number;
    name: string;
    icon_url: string | null;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    description: string;
  };
  functional_area: {
    id: number;
    icon: string | null;
    name: string;
    description: string;
    icon_dark_url: string | null;
    icon_white_url: string | null;
  };
  blox_attachments: {
    id: number;
    kind: string;
    name: string;
    media: string;
    file_url: string | null;
    description: string;
    extra_fields: any[];
  }[];
  blox_evaluations: any[];
  allow_ead_content: boolean;
  bibliography_basic: {
    id: number;
    kind: string;
    name: string;
    media: string;
    blox_id: number;
    file_data: object | null;
    created_at: string;
    updated_at: string;
    description: string;
    extra_fields: any[];
    bibliography_type_id: number;
  }[];
  pedagogic_resources: any[] | null;
  bibliography_complementary: {
    id: number;
    kind: string;
    name: string;
    media: string;
    blox_id: number;
    file_data: object | null;
    created_at: string;
    updated_at: string;
    description: string;
    extra_fields: any[];
    bibliography_type_id: number;
  }[];
}

export interface CurricularUnitResponse {
  id: number;
  location: string;
  schedules: any[];
  price: string;
  title: string;
  modality: string;
  hours_points: number;
  language: string | null;
  language_flag_url: string | null;
  cached_blox: CachedBlox;
}

export type RegisterResponse = {
  status: "success" | "error";
  errors?: object;
  data: RegisterData;
};

export interface LoginData {
  token: string;
  expires_at: string;
  user_id: number;
}

export type LoginResponse = LoginData | { error: string };
