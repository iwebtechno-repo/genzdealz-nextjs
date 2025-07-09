"use client";

import { useTheme } from "next-themes";
import {
  HouseIcon,
  SignInIcon,
  UserCircleIcon,
  SparkleIcon,
  WalletIcon,
  ShoppingBagIcon,
  UsersThreeIcon,
  CompassIcon,
  DotsThreeIcon,
  GiftIcon,
  SunIcon,
  MoonIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { UserMenu } from "./user-menu";
import { NavbarSkeleton } from "./navbar-skeleton";
import { Card } from "@/components/ui/card";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const NavButton = ({
  item,
  isActive,
  isDesktop = false,
}: {
  item: {
    href: string;
    icon: React.ElementType;
    label: string;
    protected: boolean;
  };
  isActive: boolean;
  isDesktop?: boolean;
}) => {
  const router = useRouter();
  const iconWeight = useIconWeight();

  return (
    <Button
      variant={isActive ? "gradient" : "link"}
      effect="fill"
      size={isDesktop ? "default" : "default"}
      className={cn(
        "h-auto transition-all duration-200",
        isDesktop
          ? "font-semibold flex-row"
          : "rounded-full px-4 py-3 flex-col gap-y-1"
      )}
      onClick={() => router.push(item.href)}
      title={item.label}
      showRipple
    >
      <item.icon
        className={cn("h-5 w-5", isDesktop && "mr-2")}
        weight={isActive ? "duotone" : iconWeight}
      />
      <span className={cn(!isDesktop && "text-xs font-medium")}>
        {item.label}
      </span>
    </Button>
  );
};

export const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const allNavItems = [
    { href: "/", icon: HouseIcon, label: "Home", protected: false },
    {
      href: "/deal-of-the-day",
      icon: GiftIcon,
      label: "Deal of the Day",
      protected: false,
    },
    {
      href: "/genzgpt",
      icon: SparkleIcon,
      label: "GenZGPT",
      protected: true,
    },
    { href: "/explore", icon: CompassIcon, label: "Explore", protected: false },
    { href: "/recharge", icon: WalletIcon, label: "Recharge", protected: true },
    {
      href: "/giftcards",
      icon: GiftIcon,
      label: "Gift Cards",
      protected: true,
    },
    {
      href: "/brands",
      icon: ShoppingBagIcon,
      label: "Brands",
      protected: true,
    },
    {
      href: "/shared-subscriptions",
      icon: UsersThreeIcon,
      label: "Shares",
      protected: true,
    },
  ];

  const visibleNavItems = isAuthenticated
    ? allNavItems
    : allNavItems.filter((item) => !item.protected);

  const profileItem = {
    href: "/profile",
    icon: UserCircleIcon,
    label: "Profile",
    protected: true,
  };

  const primaryMobileItems = visibleNavItems.slice(0, 3);
  const overflowMobileItems = visibleNavItems.slice(3);

  const ThemeToggle = () => (
    <div className="flex items-center space-x-2 cursor-pointer">
      <SunIcon className="h-5 w-5 text-muted-foreground" />
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={handleThemeToggle}
      />
      <MoonIcon className="h-5 w-5 text-muted-foreground" />
    </div>
  );

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Mobile & Tablet Navbar */}
      <Card
        variant="none"
        effect="glass"
        className="w-auto mx-auto flex items-center justify-center gap-x-1 px-2 py-2 rounded-full lg:hidden"
      >
        {primaryMobileItems.map((item) => (
          <NavButton
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}

        <div className="hidden sm:flex items-center gap-x-1">
          {overflowMobileItems.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        {isAuthenticated && (
          <div className="hidden md:flex">
            <NavButton
              item={profileItem}
              isActive={pathname === profileItem.href}
            />
          </div>
        )}

        <div className="sm:hidden">
          <Separator orientation="vertical" className="h-10 mx-1" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" size="icon" className="rounded-full">
                <DotsThreeIcon className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 mb-2 p-2" align="center">
              <div className="space-y-1">
                {overflowMobileItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="link"
                    className="w-full justify-start"
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
                {isAuthenticated && (
                  <Button
                    variant="link"
                    className="w-full justify-start md:hidden"
                    onClick={() => router.push(profileItem.href)}
                  >
                    <profileItem.icon className="mr-2 h-5 w-5" />
                    {profileItem.label}
                  </Button>
                )}
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {/* Desktop Navbar */}
      <Card
        variant="none"
        effect="glass"
        className="w-full max-w-6xl mx-auto hidden lg:flex items-center justify-between px-4 py-2 rounded-full"
      >
        <div className="flex items-center gap-x-2">
          {visibleNavItems.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isDesktop
            />
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button
              variant={pathname === "/login" ? "blue" : "link"}
              size="sm"
              onClick={() => router.push("/login")}
              showRipple
            >
              <SignInIcon className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </Card>
    </nav>
  );
};
