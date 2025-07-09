import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type ColorVariant, type ComponentEffect } from "@/lib/morphy-ui/types";
import {
  getVariantStyles,
  getIconColor,
  getRippleColor,
} from "@/lib/morphy-ui/utils";
import { useRipple } from "@/lib/morphy-ui/ripple";
import { type IconWeight } from "@phosphor-icons/react";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        xl: "h-14 px-16 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: ColorVariant;
  effect?: ComponentEffect;
  showRipple?: boolean;
  icon?: {
    icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
    title?: string;
    subtitle?: string;
    weight?: IconWeight;
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "gradient",
      effect = "glass",
      size,
      asChild = false,
      showRipple = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { addRipple, resetRipple, ripple } = useRipple();
    const iconWeight = useIconWeight();

    // Get centralized styles
    const variantStyles = getVariantStyles(variant, effect);
    const iconColor = getIconColor(variant, effect);

    // Icon component
    const IconComponent = icon?.icon;

    // Determine if this is an icon-only button
    const hasTextContent = children && React.Children.count(children) > 0;

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (showRipple) {
        addRipple(e);
      }
      // Call the original onMouseEnter if it exists
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (showRipple) {
        resetRipple();
      }
      // Call the original onMouseLeave if it exists
      props.onMouseLeave?.(e);
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ size }),
          variantStyles,
          showRipple ? "relative overflow-hidden" : "",
          className
        )}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {IconComponent && (
          <IconComponent
            className={cn(
              "h-4 w-4",
              // Apply margin only when there's text content
              hasTextContent ? "mr-2.5" : "",
              iconColor
            )}
            weight={icon?.weight || iconWeight}
          />
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
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
