"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button } from "./button";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  isPasswordVisible?: boolean;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      className,
      label,
      icon: Icon,
      error,
      showPasswordToggle,
      onPasswordToggle,
      isPasswordVisible,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Function to check if input has value
    const checkValue = (input: HTMLInputElement | null) => {
      if (!input) return false;
      return input.value.length > 0;
    };

    // Update value state whenever value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(String(value).length > 0);
      }
    }, [value]);

    // Check initial value and handle autofill
    React.useEffect(() => {
      const input = inputRef.current;
      if (!input) return;

      // Initial check
      setHasValue(checkValue(input));

      // Function to check for autofill
      const checkAutofill = () => {
        // Check if the input is autofilled
        const isAutofilled = input.matches(":-webkit-autofill");
        if (isAutofilled) {
          setHasValue(true);
        }
      };

      // Check immediately
      checkAutofill();

      // Check after a short delay (for Chrome autofill)
      const timeoutId = setTimeout(checkAutofill, 100);

      // Listen for animation start to detect autofill
      const handleAnimationStart = (e: AnimationEvent) => {
        if (e.animationName.includes("onAutoFillStart")) {
          setHasValue(true);
        }
      };

      // Listen for input event (for Firefox autofill)
      const handleInput = () => {
        setHasValue(checkValue(input));
      };

      input.addEventListener("animationstart", handleAnimationStart);
      input.addEventListener("input", handleInput);

      return () => {
        clearTimeout(timeoutId);
        input.removeEventListener("animationstart", handleAnimationStart);
        input.removeEventListener("input", handleInput);
      };
    }, []);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Force check the current value on blur
      const currentValue = e.target.value;
      setHasValue(currentValue.length > 0);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = e.target.value;
      setHasValue(currentValue.length > 0);
      props.onChange?.(e);
    };

    // Determine if label should float
    const shouldFloat = isFocused || hasValue;

    return (
      <div className="relative">
        <div className="relative">
          <input
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            className={cn(
              "peer h-12 w-full rounded-md border bg-transparent px-3 pt-4 pb-1 text-sm shadow-sm transition-all",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-transparent",
              "focus:outline-none focus:ring-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              Icon && "pl-10",
              showPasswordToggle && "pr-10",
              error
                ? "border-destructive focus:ring-destructive/50"
                : "border-input focus:border-[#d0427f] focus:ring-[#d0427f]/20",
              className
            )}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          )}
          {showPasswordToggle && (
            <Button
              variant="none"
              effect="glass"
              size="sm"
              type="button"
              showRipple={true}
              onClick={onPasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors h-auto p-0 bg-transparent border-0"
            >
              {isPasswordVisible ? (
                <EyeSlashIcon className="h-5 w-5" weight="duotone" />
              ) : (
                <EyeIcon className="h-5 w-5" weight="duotone" />
              )}
            </Button>
          )}
          <label
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200",
              Icon ? "left-10" : "left-3",
              shouldFloat && "text-xs -translate-y-[1.125rem] text-[#d0427f]"
            )}
          >
            {label}
          </label>
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
