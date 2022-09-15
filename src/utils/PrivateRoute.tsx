import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoutes() {
  const {
    state: { loggedIn },
  } = useAuth()!;

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
}
