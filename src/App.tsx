import ApplicationRouter from "./components/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { applicationTheme } from "./configs/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
