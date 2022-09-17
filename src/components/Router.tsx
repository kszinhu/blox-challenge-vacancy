import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes as applicationRoutes } from "../configs/routes";

import PrivateRoutes from "../utils/PrivateRoute";
import PaginateRoutes from "../utils/PaginateRoute";

export default function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        {applicationRoutes.map(
          ({ component: Component, path, key, restrict, paginate }) => {
            if (restrict) {
              if (paginate) {
                return (
                  <Route key={`paginate-${key}`} element={<PaginateRoutes />}>
                    <Route key={key} path={path} element={<PrivateRoutes />}>
                      <Route key={key} path={path} element={<Component />} />
                    </Route>
                  </Route>
                );
              }

              return (
                <Route key={key} path={path} element={<PrivateRoutes />}>
                  <Route key={key} path={path} element={<Component />} />
                </Route>
              );
            } else {
              return <Route key={key} path={path} element={<Component />} />;
            }
          }
        )}
      </Routes>
    </Router>
  );
}
