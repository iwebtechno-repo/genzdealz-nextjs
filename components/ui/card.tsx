"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type ColorVariant } from "@/lib/morphy-ui/types";
import { type IconWeight } from "@phosphor-icons/react";
import { getVariantStyles, getIconColor } from "@/lib/morphy-ui/utils";
import { useRipple } from "@/lib/morphy-ui/ripple";

// ============================================================================
// CARD COMPONENT
// ============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ColorVariant;
  showRipple?: boolean;
  icon?: {
    icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
    title?: string;
    subtitle?: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "none",
      showRipple = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const { RippleContainer } = useRipple(variant);

    // Get centralized styles
    const variantStyles = getVariantStyles(variant);
    const iconColor = getIconColor(variant);

    // Icon component
    const IconComponent = icon?.icon;
    const iconPosition = icon?.position || "top-left";

    // Icon positioning classes
    const iconPositionClasses = {
      "top-left": "absolute top-4 left-4",
      "top-right": "absolute top-4 right-4",
      "bottom-left": "absolute bottom-4 left-4",
      "bottom-right": "absolute bottom-4 right-4",
    };

    const cardContent = (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm relative",
          variantStyles,
          className
        )}
        {...props}
      >
        {IconComponent && (
          <div
            className={cn(
              "flex items-center gap-2",
              iconPositionClasses[iconPosition]
            )}
          >
            <IconComponent
              className={cn("h-5 w-5", iconColor)}
              weight="regular"
            />
            {(icon.title || icon.subtitle) && (
              <div className="flex flex-col">
                {icon.title && (
                  <span className="text-sm font-medium">{icon.title}</span>
                )}
                {icon.subtitle && (
                  <span className="text-xs text-muted-foreground">
                    {icon.subtitle}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    );

    // Wrap with ripple if enabled
    if (showRipple) {
      return <RippleContainer>{cardContent}</RippleContainer>;
    }

    return cardContent;
  }
);

Card.displayName = "Card";

// ============================================================================
// CARD SUBCOMPONENTS
// ============================================================================

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
