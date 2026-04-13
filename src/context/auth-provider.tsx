import { useState } from "react";
import { api } from "@/lib/axios";
import { AuthContext } from "./auth-context";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type User = {
  name?: string;
  email: string;
  password: string | number;
  id?: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken");
  });

  const login = async (credentials: User) => {
    const { data } = await api.post("/auth/login", credentials);

    setUser(data.user);
    setAccessToken(data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("accessToken", data.accessToken);
  };

  const register = async (payload: User) => {
    const { data } = await api.post("/auth/register", payload);

    setUser(data.user);
    setAccessToken(data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("accessToken", data.accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
