import ApplicationRouter from "./components/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { applicationTheme } from "./configs/theme";

export default function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <ThemeProvider theme={applicationTheme}>
        <ApplicationRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}
