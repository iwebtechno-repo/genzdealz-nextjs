"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import {
  MoonIcon,
  SunIcon,
  ChatCircleIcon,
  HouseIcon,
  SignInIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
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

export const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-28">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/genzdealz_darkmode.svg"
                  : "/genzdealz_lightmode.svg"
              }
              alt="GenZDealZ.ai Logo"
              width={180}
              height={48}
              className="h-16 w-auto"
              priority
              unoptimized
            />
          </Link>

          <div className="flex items-center space-x-8 ml-16">
            <Button
              variant="link"
              effect="glass"
              size="sm"
              showRipple={false}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200",
                pathname === "/"
                  ? "text-[#d0427f] underline underline-offset-4"
                  : "text-muted-foreground"
              )}
              onClick={() => router.push("/")}
            >
              <HouseIcon className="h-5 w-5" weight="regular" />
              <span>Home</span>
            </Button>

            {isAuthenticated && (
              <Button
                variant="link"
                effect="glass"
                size="sm"
                showRipple={false}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200",
                  pathname === "/genzgpt"
                    ? "text-[#d0427f] underline underline-offset-4"
                    : "text-muted-foreground"
                )}
                onClick={() => router.push("/genzgpt")}
              >
                <ChatCircleIcon className="h-5 w-5" weight="regular" />
                <span>GenZGPT</span>
              </Button>
            )}

            {!isAuthenticated && (
              <Button
                variant="link"
                effect="glass"
                size="sm"
                showRipple={false}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200",
                  pathname === "/login"
                    ? "text-[#d0427f] underline underline-offset-4"
                    : "text-muted-foreground"
                )}
                onClick={() => router.push("/login")}
              >
                <SignInIcon className="h-5 w-5" weight="regular" />
                <span>Login</span>
              </Button>
            )}
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <SunIcon className="h-6 w-6 text-muted-foreground" />
                  <Switch
                    checked={resolvedTheme === "dark"}
                    onCheckedChange={handleThemeToggle}
                  />
                  <MoonIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Toggle light/dark mode</TooltipContent>
            </Tooltip>
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};
