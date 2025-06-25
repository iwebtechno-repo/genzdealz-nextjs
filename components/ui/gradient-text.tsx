"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
import { type ColorVariant } from "@/lib/morphy-ui/types";
import { gradientPresets } from "@/lib/morphy-ui/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: ClassValue;
  variant?: ColorVariant;
}

const gradientVariants = {
  default: `bg-gradient-to-r ${gradientPresets.primary}`,
  blue: `bg-gradient-to-r ${gradientPresets.blue}`,
  purple: `bg-gradient-to-r ${gradientPresets.purple}`,
  green: `bg-gradient-to-r ${gradientPresets.green}`,
  orange: `bg-gradient-to-r ${gradientPresets.orange}`,
  multi: `bg-gradient-to-r ${gradientPresets.multi}`,
  gradient: `bg-gradient-to-r ${gradientPresets.primary}`,
  link: `bg-gradient-to-r ${gradientPresets.primary}`,
  none: `bg-gradient-to-r ${gradientPresets.primary}`,
} as const;

export const GradientText = ({
  children,
  className,
  variant = "gradient",
}: GradientTextProps) => {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        gradientVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
