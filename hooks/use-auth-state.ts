"use client";

import { useEffect, useState, useCallback } from "react";

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string } | null>(null);

  const checkAuthState = useCallback(() => {
    const token = document.cookie.includes("token=");
    setIsAuthenticated((prev) => {
      if (prev !== token) return token;
      return prev;
    });
    setIsLoading(false);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuthState();

    // Listen for cookie changes
    const handleCookieChange = () => {
      checkAuthState();
    };

    // Listen for storage events (for cross-tab synchronization)
    window.addEventListener("storage", handleCookieChange);

    // Listen for focus events (when user returns to tab)
    window.addEventListener("focus", checkAuthState);

    return () => {
      window.removeEventListener("storage", handleCookieChange);
      window.removeEventListener("focus", checkAuthState);
    };
  }, [checkAuthState]);

  return { isAuthenticated, isLoading, checkAuthState, user };
};
