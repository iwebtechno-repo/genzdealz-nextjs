import React from "react";
import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        <GradientText>{title}</GradientText>
      </h1>
      {subtitle && (
        <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;
