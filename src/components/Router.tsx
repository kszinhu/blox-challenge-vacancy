import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes as applicationRoutes } from "../configs/routes";

import PrivateRoutes from "../utils/PrivateRoute";
import PaginateRoutes from "../utils/PaginateRoute";

export default function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        {applicationRoutes.map(
          ({
            component: Component,
            layout: LayoutComponent,
            layoutProps,
            path,
            key,
            restrict,
            paginate,
          }) => {
            if (restrict) {
              if (paginate) {
                return (
                  <Route key={`paginate-${key}`} element={<PaginateRoutes />}>
                    <Route key={key} path={path} element={<PrivateRoutes />}>
                      <Route
                        key={key}
                        path={path}
                        element={
                          LayoutComponent ? (
                            <LayoutComponent {...layoutProps}>
                              <Component />
                            </LayoutComponent>
                          ) : (
                            <Component />
                          )
                        }
                      />
                    </Route>
                  </Route>
                );
              }

              return (
                <Route key={key} path={path} element={<PrivateRoutes />}>
                  <Route
                    key={key}
                    path={path}
                    element={
                      LayoutComponent ? (
                        <LayoutComponent {...layoutProps}>
                          <Component />
                        </LayoutComponent>
                      ) : (
                        <Component />
                      )
                    }
                  />
                </Route>
              );
            } else {
              return (
                <Route
                  key={key}
                  path={path}
                  element={
                    LayoutComponent ? (
                      <LayoutComponent {...layoutProps}>
                        <Component />
                      </LayoutComponent>
                    ) : (
                      <Component />
                    )
                  }
                />
              );
            }
          }
        )}
      </Routes>
    </Router>
  );
}
