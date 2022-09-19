import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../PrivateRoute";
import { AuthProvider } from "../../contexts/AuthContext";

global.React = React;

describe("<PrivateRoutes />", () => {
  describe("when the user is not logged in", () => {
    it("should render the fallback route", () => {
      const FakeComponent = () => <div>fake component</div>;
      const Login = () => <div>Sign In</div>;

      render(
        <AuthProvider>
          <Router>
            <Routes>
              <Route path='/sign-in' element={<Login />} />
              <Route path='/' element={<PrivateRoutes />}>
                <Route path='/' element={<FakeComponent />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      );

      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });
  });
});
