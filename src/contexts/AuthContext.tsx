import { createContext, useContext, useReducer, useMemo } from "react";

export type Dispatch = (action: Action) => void;
export type State = {
  user: { expiresAt: string; userId: number } | null;
  loggedIn: boolean;
  error: string | null;
};
type Action =
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "REGISTER_SUCCESS"; payload: any }
  | { type: "LOGOUT" }
  | { type: "ERROR"; payload: any };
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const useAuth = () => useContext(AuthContext);

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: {
          expiresAt: action.payload.expires_at,
          userId: action.payload.user_id,
        },
        loggedIn: true,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    loggedIn: false,
    user: null,
    error: null,
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
