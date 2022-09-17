export interface AuthActions {
  type: "LOGIN_SUCCESS" | "LOGOUT" | "REGISTER_SUCCESS" | "ERROR";
  payload?: any;
}

export interface AuthState {
  user: { expiresAt: string; userId: number } | null;
  loggedIn: boolean;
  error: string | null;
}

const verifyToken = () => {
  const token = localStorage.getItem("access_token"),
    expires_at = new Date(localStorage.getItem("expires_at") || ""),
    now = new Date();
  return token && expires_at && expires_at > now ? true : false;
};

export const initialState: AuthState = {
  loggedIn: verifyToken(),
  user: null, // don't exist persisted user
  error: null,
};

export function AuthReducer(state: AuthState, action: AuthActions) {
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
