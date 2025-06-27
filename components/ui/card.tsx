"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type ColorVariant, type ComponentEffect } from "@/lib/morphy-ui/types";
import { type IconWeight } from "@phosphor-icons/react";
import {
  getVariantStyles,
  getVariantStylesNoHover,
  getRippleColor,
} from "@/lib/morphy-ui/utils";
import { useRipple } from "@/lib/morphy-ui/ripple";
import { useState } from "react";

// ============================================================================
// CARD COMPONENT
// ============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ColorVariant;
  effect?: ComponentEffect;
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
      effect = "glass",
      showRipple = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const { addRipple, resetRipple, ripple } = useRipple();
    const [isHovered, setIsHovered] = useState(false);

    // Get centralized styles - use no-hover version when ripple is disabled
    const variantStyles = showRipple
      ? getVariantStyles(variant, effect)
      : getVariantStylesNoHover(variant, effect);

    // Icon component
    const IconComponent = icon?.icon;
    const iconPosition = icon?.position || "top-left";

    // Icon positioning classes
    const iconPositionClasses = {
      "top-left": "absolute top-6 left-6",
      "top-right": "absolute top-6 right-6",
      "bottom-left": "absolute bottom-6 left-6",
      "bottom-right": "absolute bottom-6 right-6",
    };

    // Calculate padding based on icon position and content
    const getIconPadding = () => {
      if (!IconComponent) return "";

      const hasTitleOrSubtitle = icon?.title || icon?.subtitle;
      const isTopPositioned =
        iconPosition === "top-left" || iconPosition === "top-right";
      const isBottomPositioned =
        iconPosition === "bottom-left" || iconPosition === "bottom-right";

      if (isTopPositioned) {
        // Add top padding for top-positioned icons
        return hasTitleOrSubtitle ? "pt-20" : "pt-16";
      } else if (isBottomPositioned) {
        // Add bottom padding for bottom-positioned icons
        return hasTitleOrSubtitle ? "pb-20" : "pb-16";
      }

      return "";
    };

    const getIconBoxStyle = (isHovered: boolean) => {
      if (!isHovered) {
        return "bg-background/50 backdrop-blur-sm border border-transparent";
      }

      switch (variant) {
        case "gradient":
        case "multi":
          return "bg-gradient-to-br from-[#d0427f]/20 to-[#303293]/20 dark:from-[#d0427f]/20 dark:to-[#303293]/20 border-transparent";
        case "blue":
          return "bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-400/20 dark:to-blue-500/20 border-transparent";
        case "purple":
          return "bg-gradient-to-br from-purple-500/20 to-purple-600/20 dark:from-purple-400/20 dark:to-purple-500/20 border-transparent";
        case "green":
          return "bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-400/20 dark:to-green-500/20 border-transparent";
        case "orange":
          return "bg-gradient-to-br from-orange-500/20 to-orange-600/20 dark:from-orange-400/20 dark:to-orange-500/20 border-transparent";
        default:
          return "bg-gradient-to-br from-gray-500/20 to-gray-600/20 dark:from-gray-400/20 dark:to-gray-500/20 border-transparent";
      }
    };

    const getIconColor = (isHovered: boolean) => {
      if (!isHovered) {
        switch (variant) {
          case "gradient":
          case "multi":
            return "text-[#d0427f] dark:text-[#d0427f]";
          case "blue":
            return "text-blue-500 dark:text-blue-400";
          case "purple":
            return "text-purple-500 dark:text-purple-400";
          case "green":
            return "text-green-500 dark:text-green-400";
          case "orange":
            return "text-orange-500 dark:text-orange-400";
          default:
            return "text-primary";
        }
      }
      return "text-foreground dark:text-foreground";
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      if (showRipple) {
        addRipple(e);
      }
      // Call the original onMouseEnter if it exists
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      if (showRipple) {
        resetRipple();
      }
      // Call the original onMouseLeave if it exists
      props.onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm relative p-6",
          getIconPadding(),
          variantStyles,
          showRipple ? "overflow-hidden" : "",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {IconComponent && (
          <div
            className={cn(
              "flex items-center gap-3",
              iconPositionClasses[iconPosition]
            )}
          >
            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border",
                  getIconBoxStyle(isHovered),
                  !isHovered && "border-primary/20 hover:border-primary/50"
                )}
              >
                <IconComponent
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    getIconColor(isHovered)
                  )}
                  weight="regular"
                />
              </div>
            </div>
            {(icon.title || icon.subtitle) && (
              <div className="flex flex-col">
                {icon.title && (
                  <span className="text-sm font-semibold">{icon.title}</span>
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

        {/* Ripple element */}
        {showRipple && ripple && (
          <span
            className={cn(
              "absolute rounded-full animate-ripple pointer-events-none",
              getRippleColor(variant, effect)
            )}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
    );
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
    className={cn("flex flex-col space-y-2", className)}
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
      "text-xl font-semibold leading-none tracking-tight",
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
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between pt-4 border-t border-border",
      className
    )}
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
