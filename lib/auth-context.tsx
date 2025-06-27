"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useAuthState } from "@/hooks/use-auth-state";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading, checkAuthState } = useAuthState();

  const value = useMemo(() => {
    const login = (token: string) => {
      document.cookie = `token=${token}; path=/; max-age=86400`; // 24 hours
      checkAuthState();
    };

    const logout = () => {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      checkAuthState();
    };

    return {
      isAuthenticated,
      isLoading,
      login,
      logout,
      checkAuth: checkAuthState,
    };
  }, [isAuthenticated, isLoading, checkAuthState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
