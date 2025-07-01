"use client";

import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  HouseIcon,
  SignInIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { UserMenu } from "./user-menu";
import { NavbarSkeleton } from "./navbar-skeleton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";

export const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const iconWeight = useIconWeight();

  // Show skeleton while loading
  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const handleThemeToggle = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
        {/* Navigation Items */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          <Button
            variant="link"
            effect="glass"
            size="sm"
            showRipple={false}
            className={cn(
              "flex flex-col items-center space-y-1 text-xs font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200 min-w-0",
              pathname === "/" ? "text-[#d0427f]" : "text-muted-foreground"
            )}
            onClick={() => router.push("/")}
          >
            <HouseIcon
              className="h-5 w-5"
              weight={pathname === "/" ? "fill" : iconWeight}
            />
            <span>Home</span>
          </Button>

          {isAuthenticated ? (
            <Button
              variant="link"
              effect="glass"
              size="sm"
              showRipple={false}
              className={cn(
                "flex flex-col items-center space-y-1 text-xs font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200 min-w-0",
                pathname === "/genzgpt"
                  ? "text-[#d0427f]"
                  : "text-muted-foreground"
              )}
              onClick={() => router.push("/genzgpt")}
            >
              <MagnifyingGlassIcon
                className="h-5 w-5"
                weight={pathname === "/genzgpt" ? "fill" : iconWeight}
              />
              <span>GenZGPT</span>
            </Button>
          ) : (
            <Button
              variant="link"
              effect="glass"
              size="sm"
              showRipple={false}
              className={cn(
                "flex flex-col items-center space-y-1 text-xs font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200 min-w-0",
                pathname === "/login"
                  ? "text-[#d0427f]"
                  : "text-muted-foreground"
              )}
              onClick={() => router.push("/login")}
            >
              <SignInIcon
                className="h-5 w-5"
                weight={pathname === "/login" ? "fill" : iconWeight}
              />
              <span>Login</span>
            </Button>
          )}
        </div>

        {/* Theme Toggle and User Menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <SunIcon className="h-5 w-5 text-muted-foreground" />
                <Switch
                  checked={resolvedTheme === "dark"}
                  onCheckedChange={handleThemeToggle}
                />
                <MoonIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Toggle light/dark mode</TooltipContent>
          </Tooltip>
          {isAuthenticated && <UserMenu />}
        </div>
      </div>
    </nav>
  );
};
