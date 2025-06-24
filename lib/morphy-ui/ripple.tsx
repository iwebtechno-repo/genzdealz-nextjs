"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { type ColorVariant } from "./types";
import { getRippleColor } from "./utils";

// ============================================================================
// RIPPLE PHYSICS ENGINE
// ============================================================================

export const rippleKeyframes = `
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

// ============================================================================
// RIPPLE EFFECT HOOK
// ============================================================================

export const useRipple = (variant: ColorVariant = "gradient") => {
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    size: number;
  } | null>(null);
  const hasRippled = useRef(false);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    if (hasRippled.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    // Use actual mouse position relative to the element
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Make ripple larger to flow through entire element
    const size = Math.max(rect.width, rect.height) * 2;

    setRipple({ x, y, size });
    hasRippled.current = true;

    // Reset after animation
    setTimeout(() => {
      setRipple(null);
    }, 600);
  };

  const resetRipple = () => {
    hasRippled.current = false;
  };

  return { addRipple, resetRipple, ripple };
};

// ============================================================================
// RIPPLE COMPONENT
// ============================================================================

interface RippleProps {
  variant?: ColorVariant;
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

export const Ripple = ({
  variant = "gradient",
  className,
  children,
  ...props
}: RippleProps) => {
  const { addRipple, resetRipple, ripple } = useRipple(variant);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={(e) => {
        // Trigger ripple only on enter
        addRipple(e);
      }}
      {...props}
    >
      {children}
      {ripple && (
        <span
          className={cn(
            "absolute rounded-full animate-ripple pointer-events-none",
            getRippleColor(variant)
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
};
