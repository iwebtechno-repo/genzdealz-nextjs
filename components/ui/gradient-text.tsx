"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";

interface GradientTextProps {
  children: React.ReactNode;
  className?: ClassValue;
  variant?: "default" | "blue" | "purple" | "green" | "orange" | "multi";
}

const gradientVariants = {
  default: "bg-gradient-to-r from-[#d0427f] to-[#303293]",
  blue: "bg-gradient-to-r from-blue-500 to-blue-700",
  purple: "bg-gradient-to-r from-purple-500 to-purple-700",
  green: "bg-gradient-to-r from-green-500 to-green-700",
  orange: "bg-gradient-to-r from-orange-500 to-orange-700",
  multi: "bg-gradient-to-r from-blue-500 to-purple-600",
} as const;

export const GradientText = ({
  children,
  className,
  variant = "default",
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
