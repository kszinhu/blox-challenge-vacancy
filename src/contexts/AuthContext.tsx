import { createContext, useContext, useReducer, useMemo } from "react";
import { Dispatch } from "./types";
import {
  AuthReducer,
  initialState,
  AuthState,
  AuthActions,
} from "./reducers/AuthReducer";

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<
  { state: AuthState; dispatch: Dispatch<AuthActions> } | undefined
>(undefined);

const useAuth = () => useContext(AuthContext);

const isAuthenticated = () => {
  const {
    state: { loggedIn },
  } = useAuth()!;
  return loggedIn;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth, isAuthenticated };
