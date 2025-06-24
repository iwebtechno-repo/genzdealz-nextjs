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
    opacity: 0.25;
  }
  30% {
    opacity: 0.2;
  }
  70% {
    opacity: 0.12;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
`;

// ============================================================================
// RIPPLE EFFECT HOOK
// ============================================================================

export const useRipple = (variant: ColorVariant = "gradient") => {
  const [ripples, setRipples] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
    }>
  >([]);
  const rippleId = useRef(0);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = rippleId.current++;

    setRipples((prev) => [...prev, { id, x, y, size }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  const RippleContainer = ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseDown={addRipple}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={cn(
            "absolute rounded-full animate-ripple pointer-events-none",
            getRippleColor(variant)
          )}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );

  return { addRipple, RippleContainer };
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
  const { RippleContainer } = useRipple(variant);

  return (
    <RippleContainer className={className} {...props}>
      {children}
    </RippleContainer>
  );
};
