import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../contexts/AuthContext";

export default function PrivateRoutes() {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/sign-in' />;
}
