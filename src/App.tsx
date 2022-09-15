import ApplicationRouter from "./components/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { applicationTheme } from "./configs/theme";

export default function App() {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={2}>
        <CssBaseline />
        <ThemeProvider theme={applicationTheme}>
          <ApplicationRouter />
        </ThemeProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}
