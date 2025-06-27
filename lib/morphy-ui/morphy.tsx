// ============================================================================
// MORPHY-UI MAIN ENTRY POINT
// ============================================================================

// Core types
export type {
  ColorVariant,
  ComponentEffect,
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
  getVariantStylesNoHover,
  getIconColor,
  getRippleColor,
  createGradient,
  getVariantGradient,
  getRippleGradient,
  glassEffect,
} from "./utils";

// ============================================================================
// CSS INJECTION
// ============================================================================

// Inject ripple CSS if not already injected
if (typeof window !== "undefined") {
  const rippleStyleId = "morphy-ripple-styles";
  if (!document.getElementById(rippleStyleId)) {
    const style = document.createElement("style");
    style.id = rippleStyleId;
    style.textContent = `
      @keyframes ripple {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.8;
        }
        40% {
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }

      .animate-ripple {
        animation: ripple 600ms cubic-bezier(0.2, 0, 0.1, 1);
        will-change: transform, opacity;
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    `;
    document.head.appendChild(style);
  }
}
