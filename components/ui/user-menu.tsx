"use client";

import { UserIcon, SignOutIcon, GearIcon } from "@phosphor-icons/react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

export const UserMenu = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="gradient"
          size="icon"
          showRipple={true}
          className={isOpen ? "ring-2 ring-[#d0427f]/20" : ""}
          icon={{ icon: UserIcon }}
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0" sideOffset={8}>
        <div className="p-3 border-b border-border">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </div>
        <div className="p-1">
          <Button
            variant="glass"
            size="sm"
            showRipple={true}
            className="w-full justify-start"
            onClick={() => {
              // Handle profile click
              setIsOpen(false);
            }}
            icon={{ icon: UserIcon }}
          >
            Profile
          </Button>
          <Button
            variant="glass"
            size="sm"
            showRipple={true}
            className="w-full justify-start"
            onClick={() => {
              // Handle settings click
              setIsOpen(false);
            }}
            icon={{ icon: GearIcon }}
          >
            Settings
          </Button>
          <div className="h-px bg-border my-1" />
          <Button
            variant="glass"
            size="sm"
            showRipple={true}
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleLogout}
            icon={{ icon: SignOutIcon }}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
