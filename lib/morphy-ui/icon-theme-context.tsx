"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { type IconWeight } from "@phosphor-icons/react";

// Default icon weight for the application
const DEFAULT_ICON_WEIGHT: IconWeight = "regular";

// Theme context for icon weights
interface IconTheme {
  weight: IconWeight;
  setWeight: (weight: IconWeight) => void;
}

const IconThemeContext = createContext<IconTheme | undefined>(undefined);

interface IconThemeProviderProps {
  children: ReactNode;
  defaultWeight?: IconWeight;
}

export const IconThemeProvider: React.FC<IconThemeProviderProps> = ({
  children,
  defaultWeight = DEFAULT_ICON_WEIGHT,
}) => {
  const [weight, setWeight] = useState<IconWeight>(defaultWeight);

  const value: IconTheme = {
    weight,
    setWeight,
  };

  return (
    <IconThemeContext.Provider value={value}>
      {children}
    </IconThemeContext.Provider>
  );
};

export const useIconTheme = (): IconTheme => {
  const context = useContext(IconThemeContext);
  if (context === undefined) {
    throw new Error("useIconTheme must be used within an IconThemeProvider");
  }
  return context;
};

// Hook to get the current icon weight
export const useIconWeight = (): IconWeight => {
  const { weight } = useIconTheme();
  return weight;
};
