"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch and ensure proper theme detection
  React.useEffect(() => {
    setMounted(true);

    // Force theme detection on mount to ensure proper initial state
    // This helps when system is in dark mode but theme preference isn't set
    if (theme === "system") {
      // Trigger a re-render to ensure resolvedTheme is properly detected
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const isSystemDark = mediaQuery.matches;

      // If system is dark but we're not showing dark mode correctly,
      // force a theme update to ensure proper state
      if (isSystemDark && resolvedTheme !== "dark") {
        // Small delay to ensure next-themes has properly initialized
        setTimeout(() => {
          setTheme("system");
        }, 0);
      }
    }
  }, [theme, resolvedTheme, setTheme]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="glass"
        size="icon"
        showRipple={false}
        className="cursor-pointer"
      >
        <SunIcon className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    // If user hasn't set a preference yet (theme is "system"),
    // set it to the opposite of current resolved theme
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      // User has already set a preference, toggle between light/dark
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  // Determine which icon to show based on resolved theme
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="glass"
      size="icon"
      showRipple={true}
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      <SunIcon
        className={`h-5 w-5 transition-all ${
          isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 transition-all ${
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
