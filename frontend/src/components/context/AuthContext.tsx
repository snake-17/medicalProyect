/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import {
  type AuthContextType,
  type User,
  type AuthProviderProps,
} from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user", error);
        return null;
      }
    }
    return null;
  });

  const [loading] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", JSON.stringify(userData));
  };

  // Dentro de tu AuthProvider
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
