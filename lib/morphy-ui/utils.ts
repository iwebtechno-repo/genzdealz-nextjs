import { type ColorVariant } from "./types";

// ============================================================================
// GRADIENT PRESETS
// ============================================================================

export const gradientPresets = {
  primary: "from-[#d0427f] to-[#303293]",
  secondary: "from-blue-500 to-purple-600",
  success: "from-green-500 to-emerald-600",
  warning: "from-orange-500 to-amber-600",
  danger: "from-red-500 to-pink-600",
  multi: "from-blue-500 via-purple-500 to-pink-500",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
} as const;

// ============================================================================
// VARIANT STYLES
// ============================================================================

export const getVariantStyles = (variant: ColorVariant): string => {
  switch (variant) {
    case "gradient":
      return `bg-gradient-to-r ${gradientPresets.primary} hover:from-[#d0427f]/90 hover:to-[#303293]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200`;
    
    case "glass":
      return "bg-[var(--activeGlassColor)] shadow-[0px_10px_30px_var(--activeShadowColor)] border border-[var(--fadeGrey)] backdrop-blur-[10px] hover:shadow-[0px_15px_40px_var(--activeShadowColor)] transition-all duration-200";
    
    case "blue":
      return `bg-gradient-to-r ${gradientPresets.blue} hover:from-blue-500/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200`;
    
    case "purple":
      return `bg-gradient-to-r ${gradientPresets.purple} hover:from-purple-500/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200`;
    
    case "green":
      return `bg-gradient-to-r ${gradientPresets.green} hover:from-green-500/90 hover:to-green-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200`;
    
    case "orange":
      return `bg-gradient-to-r ${gradientPresets.orange} hover:from-orange-500/90 hover:to-orange-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200`;
    
    case "multi":
      return `bg-gradient-to-r ${gradientPresets.multi} hover:from-blue-500/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-lg hover:shadow-xl transition-all duration-200`;
    
    case "link":
      return "text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-200";
    
    case "none":
    default:
      return "bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200";
  }
};

// ============================================================================
// ICON COLORS
// ============================================================================

export const getIconColor = (variant: ColorVariant): string => {
  switch (variant) {
    case "gradient":
    case "blue":
    case "purple":
    case "green":
    case "orange":
    case "multi":
      return "text-white";
    
    case "glass":
      return "text-foreground";
    
    case "link":
      return "text-primary";
    
    case "none":
    default:
      return "text-foreground";
  }
};

// ============================================================================
// RIPPLE COLORS
// ============================================================================

export const getRippleColor = (variant: ColorVariant): string => {
  switch (variant) {
    case "gradient":
      return "bg-white/20";
    
    case "glass":
      return "bg-foreground/10";
    
    case "blue":
      return "bg-blue-400/30";
    
    case "purple":
      return "bg-purple-400/30";
    
    case "green":
      return "bg-green-400/30";
    
    case "orange":
      return "bg-orange-400/30";
    
    case "multi":
      return "bg-white/20";
    
    case "link":
      return "bg-primary/20";
    
    case "none":
    default:
      return "bg-foreground/10";
  }
};

// ============================================================================
// GRADIENT UTILITIES
// ============================================================================

export const createGradient = (
  direction: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl" = "to-r",
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
    case "purple":
      return gradientPresets.purple;
    case "green":
      return gradientPresets.green;
    case "orange":
      return gradientPresets.orange;
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
    case "glass":
      return "from-foreground/10 to-foreground/5";
    case "blue":
      return "from-blue-400/30 to-blue-400/15";
    case "purple":
      return "from-purple-400/30 to-purple-400/15";
    case "green":
      return "from-green-400/30 to-green-400/15";
    case "orange":
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