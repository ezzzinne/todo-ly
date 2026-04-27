import { createContext } from "react";
import type { LoginCredentials, RegisterPayload } from "./auth-provider";

type User = {
  name?: string;
  email: string;
  id?: string;
};

type AuthContextType = {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
