"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Custom hook for overflow detection
export const useOverflowDetection = (content: string) => {
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const elementRef = React.useRef<HTMLElement>(null);
  const hasCheckedRef = React.useRef(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element || hasCheckedRef.current) return;

    const checkOverflow = () => {
      // Force a reflow to get accurate measurements
      element.offsetHeight;

      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;
      const isOverflow = scrollWidth > clientWidth;

      console.log("Overflow check:", {
        content: content.substring(0, 50) + "...",
        scrollWidth,
        clientWidth,
        isOverflow,
      });

      if (isOverflow) {
        setIsOverflowing(true);
        hasCheckedRef.current = true; // Only check once
      }
    };

    // Check after a delay to ensure DOM is ready
    const timer = setTimeout(checkOverflow, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  return { isOverflowing, elementRef };
};

// Automatic overflow tooltip component
export const AutoOverflowTooltip = ({
  children,
  content,
  className = "",
  as: Component = "span",
  ...props
}: {
  children: React.ReactNode;
  content: string;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}) => {
  const { isOverflowing, elementRef } = useOverflowDetection(content);

  console.log("AutoOverflowTooltip render:", {
    content: content.substring(0, 30),
    isOverflowing,
  });

  if (!isOverflowing) {
    return (
      <Component ref={elementRef} className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Component
            ref={elementRef}
            className={`${className} cursor-default`}
            {...props}
          >
            {children}
          </Component>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Enhanced truncate component with automatic tooltips
export const TruncateText = ({
  children,
  className = "",
  as: Component = "span",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}) => {
  const content = typeof children === "string" ? children : "";

  return (
    <AutoOverflowTooltip
      content={content}
      className={`truncate ${className}`}
      as={Component}
      {...props}
    >
      {children}
    </AutoOverflowTooltip>
  );
};

// Global tooltip provider
export const GlobalTooltipProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
