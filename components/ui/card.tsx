"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type ColorVariant, type ComponentEffect } from "@/lib/morphy-ui/types";
import { type IconWeight } from "@phosphor-icons/react";
import {
  getVariantStyles,
  getVariantStylesNoHover,
  getIconColor,
  getRippleColor,
} from "@/lib/morphy-ui/utils";
import { useRipple } from "@/lib/morphy-ui/ripple";

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

    // Get centralized styles - use no-hover version when ripple is disabled
    const variantStyles = showRipple
      ? getVariantStyles(variant, effect)
      : getVariantStylesNoHover(variant, effect);
    const iconColor = getIconColor(variant, effect);

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

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (showRipple) {
        addRipple(e);
      }
      // Call the original onMouseEnter if it exists
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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
            <IconComponent
              className={cn("h-6 w-6", iconColor)}
              weight="regular"
            />
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
