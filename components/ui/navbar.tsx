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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth-context";
import { UserMenu } from "./user-menu";
import { NavbarSkeleton } from "./navbar-skeleton";

export const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  // Show skeleton while loading
  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const links = [
    {
      href: "/",
      label: "Home",
      icon: HouseIcon,
    },
    {
      href: "/genzgpt",
      label: "GenZGPT",
      icon: ChatCircleIcon,
    },
  ];

  // Render navigation links based on auth state
  const renderNavLinks = () => {
    if (isAuthenticated) {
      return links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200",
              pathname === link.href
                ? "text-[#d0427f]"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        );
      });
    }

    return (
      <>
        <Link
          href="/"
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200",
            pathname === "/" ? "text-[#d0427f]" : "text-muted-foreground"
          )}
        >
          <HouseIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/login"
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[#d0427f] hover:opacity-80 duration-200",
            pathname === "/login" ? "text-[#d0427f]" : "text-muted-foreground"
          )}
        >
          <SignInIcon className="h-5 w-5" />
          <span>Login</span>
        </Link>
      </>
    );
  };

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
            {renderNavLinks()}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SunIcon className="h-6 w-6 text-muted-foreground" />
              <Switch
                checked={resolvedTheme === "dark"}
                onCheckedChange={handleThemeToggle}
              />
              <MoonIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};
