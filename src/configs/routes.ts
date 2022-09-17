import * as pages from "../pages";
import * as layouts from "../layouts";
import React from "react";

interface ObjectRoute {
  path: string;
  key: string;
  title: string;
  exact?: boolean;
  restrict?: boolean;
  paginate?: boolean;
  component: React.ComponentType;
  layout?: React.FC<any>;
  layoutProps?: {
    title: string;
    tabs: { key: string; label: string; path: string; disabled?: boolean }[];
  };
}

export const routes: ObjectRoute[] = [
  {
    path: "/sign-up",
    key: "SIGN_UP",
    title: "Registre-se",
    component: pages.Register,
  },
  {
    path: "/sign-in",
    key: "SIGN_IN",
    title: "Entre na sua conta",
    component: pages.Login,
  },
  {
    path: "/curricular-units",
    key: "LIST_CURRICULAR",
    title: "Lista curricular",
    restrict: true,
    paginate: true,
    layout: layouts.ListLayout,
    layoutProps: {
      title: "Gerenciar Unidades Curriculares",
      tabs: [
        {
          key: "LIST_CURRICULAR",
          label: "Lista",
          path: "/curricular-units",
        },
        {
          key: "CREATE_CURRICULAR",
          label: "Criar novo",
          path: "/create-curricular-unit",
          disabled: true,
        },
      ],
    },
    component: pages.ListCurricular,
  },
  {
    // route to handler root, and use flow (redirect to login or list curricular)
    path: "/",
    key: "ROOT",
    title: "Registre-se",
    component: pages.Register,
  },
  {
    path: "*",
    key: "NOT_FOUND",
    title: "Página não encontrada",
    component: pages.NotFound,
  },
];
