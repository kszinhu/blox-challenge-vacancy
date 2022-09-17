import * as pages from "../pages";

interface ObjectRoute {
  path: string;
  key: string;
  title: string;
  exact?: boolean;
  restrict?: boolean;
  paginate?: boolean;
  component: React.ComponentType;
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
