import ApplicationRouter from "./components/Router";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ApplicationRouter />
    </AuthProvider>
  );
}
