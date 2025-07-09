import { type ColorVariant, type ComponentEffect } from "./types";

// ============================================================================
// ENHANCED GRADIENT PRESETS
// ============================================================================

export const gradientPresets = {
  // Primary brand gradient
  primary: "from-[#d0427f] to-[#303293]",

  // Solid color gradients (for non-gradient variants)
  secondary: "from-blue-500 to-purple-600",
  success: "from-green-500 to-emerald-600",
  warning: "from-orange-500 to-amber-600",
  danger: "from-red-500 to-pink-600",
  multi: "from-blue-500 via-purple-500 to-pink-500",

  // Base colors (for solid variants)
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",

  // Enhanced gradient variants for all colors
  "blue-gradient": "from-blue-400 via-blue-500 to-blue-700",
  "purple-gradient": "from-purple-400 via-purple-500 to-purple-700",
  "green-gradient": "from-green-400 via-green-500 to-green-700",
  "orange-gradient": "from-orange-400 via-orange-500 to-orange-700",
} as const;

// ============================================================================
// VARIANT STYLES
// ============================================================================

export const getVariantStyles = (
  variant: ColorVariant,
  effect: ComponentEffect = "fill"
): string => {
  switch (variant) {
    case "gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.primary} hover:from-[#d0427f]/90 hover:to-[#303293]/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[#d0427f]/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "blue":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.blue} hover:from-blue-500/90 hover:to-blue-600/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-blue-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "blue-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["blue-gradient"]} hover:from-blue-400/90 hover:via-blue-500/90 hover:to-blue-700/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-blue-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "purple":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.purple} hover:from-purple-500/90 hover:to-purple-600/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-purple-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "purple-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["purple-gradient"]} hover:from-purple-400/90 hover:via-purple-500/90 hover:to-purple-700/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-purple-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "green":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.green} hover:from-green-500/90 hover:to-green-600/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-green-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "green-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["green-gradient"]} hover:from-green-400/90 hover:via-green-500/90 hover:to-green-700/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-green-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "orange":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.orange} hover:from-orange-500/90 hover:to-orange-600/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-orange-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "orange-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["orange-gradient"]} hover:from-orange-400/90 hover:via-orange-500/90 hover:to-orange-700/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-orange-500/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "multi":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.multi} hover:from-blue-500/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-lg transition-shadow,transition-colors duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[#d0427f]/20 backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }

    case "link":
      return "text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-200 bg-transparent border-none shadow-none";

    case "outline":
      return "text-primary bg-primary/10 border border-primary/30 hover:bg-primary/20 shadow-sm transition-colors duration-200";

    case "none":
    default:
      if (effect === "fill") {
        return "bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200";
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[var(--fadeGrey)] backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-shadow,transition-colors duration-200";
      }
  }
};

// ============================================================================
// VARIANT STYLES WITHOUT HOVER (FOR NON-RIPPLE CARDS)
// ============================================================================

export const getVariantStylesNoHover = (
  variant: ColorVariant,
  effect: ComponentEffect = "fill"
): string => {
  switch (variant) {
    case "gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.primary} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[#d0427f]/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "blue":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.blue} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-blue-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "blue-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["blue-gradient"]} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-blue-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "purple":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.purple} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-purple-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "purple-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["purple-gradient"]} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-purple-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "green":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.green} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-green-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "green-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["green-gradient"]} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-green-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "orange":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.orange} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-orange-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "orange-gradient":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets["orange-gradient"]} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-orange-500/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "multi":
      if (effect === "fill") {
        return `bg-gradient-to-r ${gradientPresets.multi} text-white shadow-lg transition-all duration-200`;
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[#d0427f]/20 backdrop-blur-[10px] transition-all duration-200";
      }

    case "link":
      return "text-primary underline-offset-4 transition-colors duration-200 bg-transparent border-none shadow-none";

    case "outline":
      return "text-primary bg-primary/10 border border-primary/30 shadow-sm transition-all duration-200";

    case "none":
    default:
      if (effect === "fill") {
        return "bg-background border border-border transition-colors duration-200";
      } else {
        return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[var(--fadeGrey)] backdrop-blur-[10px] transition-all duration-200";
      }
  }
};

// ============================================================================
// ICON COLORS
// ============================================================================

export const getIconColor = (
  variant: ColorVariant,
  effect: ComponentEffect = "fill"
): string => {
  switch (variant) {
    case "gradient":
    case "blue":
    case "blue-gradient":
    case "purple":
    case "purple-gradient":
    case "green":
    case "green-gradient":
    case "orange":
    case "orange-gradient":
    case "multi":
      if (effect === "fill") {
        return "text-white";
      } else {
        // For glass effect, use variant color for icons
        switch (variant) {
          case "gradient":
          case "multi":
            return "text-[#d0427f]";
          case "blue":
          case "blue-gradient":
            return "text-blue-500";
          case "purple":
          case "purple-gradient":
            return "text-purple-500";
          case "green":
          case "green-gradient":
            return "text-green-500";
          case "orange":
          case "orange-gradient":
            return "text-orange-500";
          default:
            return "text-[#d0427f]";
        }
      }

    case "link":
      return "text-primary";

    case "outline":
      return "text-primary";

    case "none":
    default:
      if (effect === "fill") {
        return "text-foreground";
      } else {
        return "text-foreground";
      }
  }
};

// ============================================================================
// RIPPLE COLORS
// ============================================================================

export const getRippleColor = (
  variant: ColorVariant,
  effect: ComponentEffect = "fill"
): string => {
  switch (variant) {
    case "gradient":
      if (effect === "fill") {
        return "bg-white/20";
      } else {
        return "bg-[#d0427f]/20";
      }

    case "blue":
    case "blue-gradient":
      if (effect === "fill") {
        return "bg-blue-400/30";
      } else {
        return "bg-blue-500/20";
      }

    case "purple":
    case "purple-gradient":
      if (effect === "fill") {
        return "bg-purple-400/30";
      } else {
        return "bg-purple-500/20";
      }

    case "green":
    case "green-gradient":
      if (effect === "fill") {
        return "bg-green-400/30";
      } else {
        return "bg-green-500/20";
      }

    case "orange":
    case "orange-gradient":
      if (effect === "fill") {
        return "bg-orange-400/30";
      } else {
        return "bg-orange-500/20";
      }

    case "multi":
      if (effect === "fill") {
        return "bg-white/20";
      } else {
        return "bg-[#d0427f]/20";
      }

    case "link":
      return "bg-primary/20";

    case "outline":
      return "bg-primary/20";

    case "none":
    default:
      if (effect === "fill") {
        return "bg-foreground/10";
      } else {
        return "bg-foreground/10";
      }
  }
};

// ============================================================================
// GRADIENT UTILITIES
// ============================================================================

export const createGradient = (
  direction:
    | "to-r"
    | "to-l"
    | "to-t"
    | "to-b"
    | "to-tr"
    | "to-tl"
    | "to-br"
    | "to-bl" = "to-r",
  colors: string[]
): string => {
  return `bg-gradient-${direction} ${colors.join(" ")}`;
};

export const getVariantGradient = (variant: ColorVariant): string => {
  switch (variant) {
    case "gradient":
      return gradientPresets.primary;
    case "blue":
      return gradientPresets.blue;
    case "blue-gradient":
      return gradientPresets["blue-gradient"];
    case "purple":
      return gradientPresets.purple;
    case "purple-gradient":
      return gradientPresets["purple-gradient"];
    case "green":
      return gradientPresets.green;
    case "green-gradient":
      return gradientPresets["green-gradient"];
    case "orange":
      return gradientPresets.orange;
    case "orange-gradient":
      return gradientPresets["orange-gradient"];
    case "multi":
      return gradientPresets.multi;
    default:
      return gradientPresets.primary;
  }
};

export const getRippleGradient = (variant: ColorVariant): string => {
  switch (variant) {
    case "gradient":
      return "from-white/20 to-white/10";
    case "blue":
    case "blue-gradient":
      return "from-blue-400/30 to-blue-400/15";
    case "purple":
    case "purple-gradient":
      return "from-purple-400/30 to-purple-400/15";
    case "green":
    case "green-gradient":
      return "from-green-400/30 to-green-400/15";
    case "orange":
    case "orange-gradient":
      return "from-orange-400/30 to-orange-400/15";
    case "multi":
      return "from-white/20 to-white/10";
    default:
      return "from-foreground/10 to-foreground/5";
  }
};

// ============================================================================
// GLASS EFFECT
// ============================================================================

export const glassEffect = {
  background: "bg-[var(--activeGlassColor)]",
  shadow: "shadow-[0px_10px_30px_var(--activeShadowColor)]",
  border: "border border-[var(--fadeGrey)]",
  blur: "backdrop-blur-[10px]",
  hover: "hover:shadow-[0px_15px_40px_var(--activeShadowColor)]",
  transition: "transition-all duration-200",
} as const;
