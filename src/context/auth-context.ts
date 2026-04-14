import { createContext } from "react";

type User = {
  name?: string;
  email: string;
  password: string | number;
  id?: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
