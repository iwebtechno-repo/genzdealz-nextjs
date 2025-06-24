"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { Switch } from "./switch";
import { useTheme } from "next-themes";

export const NavbarSkeleton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo skeleton */}
          <div className="h-16 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

          {/* Navigation links skeleton */}
          <div className="flex items-center space-x-8 ml-16">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          {/* Theme toggle and user section */}
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-6 w-6 text-muted-foreground" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked: boolean) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
              <Moon className="h-6 w-6 text-muted-foreground" />
            </div>
            {/* User avatar skeleton */}
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
};
