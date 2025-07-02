"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

// ============================================================================
// ENHANCED TOASTER COMPONENT WITH MORPHY-UI INTEGRATION
// ============================================================================

interface EnhancedToasterProps extends ToasterProps {
  variant?: string;
}

const Toaster = ({ className, ...props }: EnhancedToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <>
      {/* Inject custom CSS for gradient toasts - targeting Sonner's data attributes */}
      <style jsx global>{`
        /* Success toasts - Green gradient */
        [data-rich-colors="true"][data-sonner-toast][data-type="success"] {
          background: linear-gradient(
            90deg,
            #4ade80,
            #22c55e,
            #16a34a
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        /* Error toasts - Orange gradient */
        [data-rich-colors="true"][data-sonner-toast][data-type="error"] {
          background: linear-gradient(
            90deg,
            #fb923c,
            #f97316,
            #ea580c
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        /* Warning toasts - Orange gradient */
        [data-rich-colors="true"][data-sonner-toast][data-type="warning"] {
          background: linear-gradient(
            90deg,
            #fb923c,
            #f97316,
            #ea580c
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        /* Info toasts - Blue gradient */
        [data-rich-colors="true"][data-sonner-toast][data-type="info"] {
          background: linear-gradient(
            90deg,
            #60a5fa,
            #3b82f6,
            #1d4ed8
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        /* Also override without rich colors for compatibility */
        [data-sonner-toast][data-type="success"] {
          background: linear-gradient(
            90deg,
            #4ade80,
            #22c55e,
            #16a34a
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        [data-sonner-toast][data-type="error"] {
          background: linear-gradient(
            90deg,
            #fb923c,
            #f97316,
            #ea580c
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        [data-sonner-toast][data-type="warning"] {
          background: linear-gradient(
            90deg,
            #fb923c,
            #f97316,
            #ea580c
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }

        [data-sonner-toast][data-type="info"] {
          background: linear-gradient(
            90deg,
            #60a5fa,
            #3b82f6,
            #1d4ed8
          ) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }
      `}</style>

      <Sonner
        theme={theme as ToasterProps["theme"]}
        className={cn("toaster group", className)}
        toastOptions={{
          classNames: {
            toast: "group toast group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-white/80",
            actionButton:
              "group-[.toast]:bg-white/20 group-[.toast]:text-white hover:group-[.toast]:bg-white/30",
            cancelButton:
              "group-[.toast]:bg-white/10 group-[.toast]:text-white hover:group-[.toast]:bg-white/20",
          },
        }}
        {...props}
      />
    </>
  );
};

export { Toaster };
export type { EnhancedToasterProps as ToasterProps };
