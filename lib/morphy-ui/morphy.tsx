// ============================================================================
// MORPHY-UI MAIN ENTRY POINT
// ============================================================================

// Core types
export type {
  ColorVariant,
  GradientDirection,
  IconPosition,
  IconConfig,
  ButtonVariant,
  CardVariant,
  EffectPreset,
  RippleState,
  RippleProps,
  RippleHookReturn,
} from "./types";

// Animation system removed

// Ripple effects
export { useRipple, Ripple, rippleKeyframes } from "./ripple";

// Icon system
export {
  useIconWeight,
  IconThemeProvider,
  useIconTheme,
} from "./icon-theme-context";

export { IconWrapper, useGlobalIconWeight } from "./icon-utils";

// Social icons
export {
  GoogleIcon,
  AppleIcon,
  InstagramIcon,
  SocialIcons,
} from "./social-icons";

// Utilities
export {
  gradientPresets,
  getVariantStyles,
  getIconColor,
  getRippleColor,
  createGradient,
  getVariantGradient,
  getRippleGradient,
  glassEffect,
} from "./utils";

// ============================================================================
// SHOWCASE COMPONENTS (FOR DEMONSTRATION)
// ============================================================================

import React from "react";
import { gradientPresets, glassEffect } from "./utils";
import { cn } from "@/lib/utils";

// Gradient showcase component
export const GradientShowcase: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
    {Object.entries(gradientPresets).map(([name, gradient]) => (
      <div
        key={name}
        className={cn(
          "h-20 rounded-lg flex items-center justify-center text-white font-medium",
          `bg-gradient-to-r ${gradient}`
        )}
      >
        {name}
      </div>
    ))}
  </div>
);

// Glass showcase component
export const GlassShowcase: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
    <div
      className={cn(
        "h-32 rounded-lg flex items-center justify-center text-foreground font-medium",
        glassEffect.background,
        glassEffect.shadow,
        glassEffect.border,
        glassEffect.blur,
        glassEffect.hover,
        glassEffect.transition
      )}
    >
      Glass Effect
    </div>
    <div
      className={cn(
        "h-32 rounded-lg flex items-center justify-center text-foreground font-medium",
        glassEffect.background,
        glassEffect.shadow,
        glassEffect.border,
        glassEffect.blur,
        glassEffect.hover,
        glassEffect.transition
      )}
    >
      Glass Effect (Hover)
    </div>
  </div>
);
