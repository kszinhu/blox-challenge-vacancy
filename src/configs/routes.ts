import * as pages from "../pages";

interface ObjectRoute {
  path: string;
  key: string;
  title: string;
  exact?: boolean;
  restrict?: boolean;
  component: React.ComponentType;
}

export const routes: ObjectRoute[] = [
  {
    path: "/",
    key: "SIGN_UP",
    title: "Registre-se",
    exact: true,
    component: pages.Register,
  },
  {
    path: "/sign-in",
    key: "SIGN_IN",
    title: "Entre na sua conta",
    exact: true,
    component: pages.Login,
  },
  {
    path: "/list-curricular",
    key: "LIST_CURRICULAR",
    title: "Lista curricular",
    exact: true,
    restrict: true,
    component: pages.ListCurricular,
  },
  {
    path: "*",
    key: "NOT_FOUND",
    title: "Página não encontrada",
    component: pages.NotFound,
  },
];
