import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes as applicationRoutes } from "../configs/routes";

import PrivateRoutes from "../utils/PrivateRoute";

export default function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        {applicationRoutes.map(
          ({ component: Component, path, key, restrict }) =>
            restrict ? (
              <Route key={key} path={path} element={<PrivateRoutes />}>
                <Route key={key} path={path} element={<Component />} />
              </Route>
            ) : (
              <Route key={key} path={path} element={<Component />} />
            )
        )}
      </Routes>
    </Router>
  );
}
