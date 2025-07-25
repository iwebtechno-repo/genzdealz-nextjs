import { type IconWeight } from "@phosphor-icons/react";

// ============================================================================
// CORE DESIGN SYSTEM TYPES
// ============================================================================

// Enhanced color variant type with gradient variants for all colors
export type ColorVariant =
  | "none"
  | "link"
  | "gradient" // Primary brand gradient
  | "blue"
  | "blue-gradient" // Blue gradient variant
  | "purple"
  | "purple-gradient" // Purple gradient variant
  | "green"
  | "green-gradient" // Green gradient variant
  | "orange"
  | "orange-gradient" // Orange gradient variant
  | "multi"
  | "outline";

// New effect type for component styling
export type ComponentEffect = "fill" | "glass";

// ============================================================================
// DIRECTION & GRADIENT TYPES
// ============================================================================

export type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-t"
  | "to-b"
  | "to-tr"
  | "to-tl"
  | "to-br"
  | "to-bl";

// ============================================================================
// ICON & UI TYPES
// ============================================================================

export type IconPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface IconConfig {
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
  title?: string;
  subtitle?: string;
  position?: IconPosition;
}

// ============================================================================
// COMPONENT VARIANT TYPES
// ============================================================================

export type ButtonVariant =
  | "link"
  | "gradient"
  | "blue"
  | "blue-gradient"
  | "purple"
  | "purple-gradient"
  | "green"
  | "green-gradient"
  | "orange"
  | "orange-gradient"
  | "multi";

export type CardVariant =
  | "none"
  | "gradient"
  | "blue"
  | "blue-gradient"
  | "purple"
  | "purple-gradient"
  | "green"
  | "green-gradient"
  | "orange"
  | "orange-gradient"
  | "multi";

// ============================================================================
// EFFECT PRESET TYPES
// ============================================================================

export type EffectPreset =
  | "material"
  | "glassmorphism"
  | "neumorphism"
  | "flat"
  | "gradient";

// ============================================================================
// RIPPLE TYPES
// ============================================================================

export interface RippleState {
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  ripple: RippleState | null;
  color: string;
}

export interface RippleHookReturn {
  ripple: RippleState | null;
  isHovered: boolean;
  handleMouseEnter: (
    e: React.MouseEvent<HTMLElement>,
    ref: React.RefObject<HTMLElement>
  ) => void;
  handleMouseLeave: () => void;
  handleClick: (
    e: React.MouseEvent<HTMLElement>,
    ref: React.RefObject<HTMLElement>
  ) => void;
}
