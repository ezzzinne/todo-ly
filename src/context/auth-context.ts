import { createContext } from "react";

type User = {
  name?: string;
  email: string;
  id?: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
