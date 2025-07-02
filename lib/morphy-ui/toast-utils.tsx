"use client";

import { toast } from "sonner";
import { type ColorVariant } from "./types";
import { getVariantStylesNoHover, getIconColor } from "./utils";
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useIconWeight } from "./icon-theme-context";

// ============================================================================
// ENHANCED TOAST UTILITIES WITH MORPHY-UI INTEGRATION
// ============================================================================

interface ToastOptions {
  variant?: ColorVariant;
  duration?: number;
  description?: string;
}

// ============================================================================
// TOAST FUNCTIONS WITH MORPHY-UI VARIANTS
// ============================================================================

export const useMorphyToast = () => {
  const iconWeight = useIconWeight();

  const success = (message: string, options: ToastOptions = {}) => {
    const {
      variant = "green-gradient",
      duration = 3000,
      description,
    } = options;

    return toast.success(message, {
      duration,
      description,
      icon: (
        <CheckCircleIcon
          className="h-4 w-4"
          weight={iconWeight}
          style={{ color: getIconColor(variant, "fill") }}
        />
      ),
      className: getVariantStylesNoHover(variant, "fill"),
    });
  };

  const error = (message: string, options: ToastOptions = {}) => {
    const {
      variant = "orange-gradient",
      duration = 5000,
      description,
    } = options;

    return toast.error(message, {
      duration,
      description,
      icon: (
        <XCircleIcon
          className="h-4 w-4"
          weight={iconWeight}
          style={{ color: getIconColor(variant, "fill") }}
        />
      ),
      className: getVariantStylesNoHover(variant, "fill"),
    });
  };

  const warning = (message: string, options: ToastOptions = {}) => {
    const {
      variant = "orange-gradient",
      duration = 4000,
      description,
    } = options;

    return toast.warning(message, {
      duration,
      description,
      icon: (
        <WarningIcon
          className="h-4 w-4"
          weight={iconWeight}
          style={{ color: getIconColor(variant, "fill") }}
        />
      ),
      className: getVariantStylesNoHover(variant, "fill"),
    });
  };

  const info = (message: string, options: ToastOptions = {}) => {
    const { variant = "blue-gradient", duration = 4000, description } = options;

    return toast.info(message, {
      duration,
      description,
      icon: (
        <InfoIcon
          className="h-4 w-4"
          weight={iconWeight}
          style={{ color: getIconColor(variant, "fill") }}
        />
      ),
      className: getVariantStylesNoHover(variant, "fill"),
    });
  };

  const custom = (
    message: string,
    options: ToastOptions & { icon?: React.ReactNode } = {}
  ) => {
    const {
      variant = "gradient",
      duration = 4000,
      description,
      icon,
    } = options;

    return toast(message, {
      duration,
      description,
      icon: icon || (
        <SparkleIcon
          className="h-4 w-4"
          weight={iconWeight}
          style={{ color: getIconColor(variant, "fill") }}
        />
      ),
      className: getVariantStylesNoHover(variant, "fill"),
    });
  };

  return {
    success,
    error,
    warning,
    info,
    custom,
    dismiss: toast.dismiss,
    promise: toast.promise,
  };
};

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export const morphyToast = {
  success: (message: string, options?: ToastOptions) => {
    const {
      variant = "green-gradient",
      duration = 3000,
      description,
    } = options || {};

    return toast.success(message, {
      duration,
      description,
      className: getVariantStylesNoHover(variant, "fill"),
    });
  },

  error: (message: string, options?: ToastOptions) => {
    const {
      variant = "orange-gradient",
      duration = 5000,
      description,
    } = options || {};

    return toast.error(message, {
      duration,
      description,
      className: getVariantStylesNoHover(variant, "fill"),
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    const {
      variant = "orange-gradient",
      duration = 4000,
      description,
    } = options || {};

    return toast.warning(message, {
      duration,
      description,
      className: getVariantStylesNoHover(variant, "fill"),
    });
  },

  info: (message: string, options?: ToastOptions) => {
    const {
      variant = "blue-gradient",
      duration = 4000,
      description,
    } = options || {};

    return toast.info(message, {
      duration,
      description,
      className: getVariantStylesNoHover(variant, "fill"),
    });
  },

  custom: (
    message: string,
    options?: ToastOptions & { icon?: React.ReactNode }
  ) => {
    const {
      variant = "gradient",
      duration = 4000,
      description,
      icon,
    } = options || {};

    return toast(message, {
      duration,
      description,
      icon,
      className: getVariantStylesNoHover(variant, "fill"),
    });
  },
};
