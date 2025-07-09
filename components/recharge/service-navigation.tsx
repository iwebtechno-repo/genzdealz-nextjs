"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";

export interface ServiceOption {
  id: string;
  name: string;
  icon: PhosphorIcon;
  route: string;
  comingSoon?: boolean;
}

interface ServiceNavigationProps {
  services: ServiceOption[];
  selectedService?: string;
  onServiceSelect?: (serviceId: string) => void;
}

const ServiceNavigation = ({
  services,
  selectedService,
  onServiceSelect,
}: ServiceNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const iconWeight = useIconWeight();

  const handleServiceClick = (service: ServiceOption) => {
    if (service.comingSoon) return;

    if (onServiceSelect) {
      onServiceSelect(service.id);
    } else {
      router.push(service.route);
    }
  };

  const isActive = (service: ServiceOption) => {
    if (selectedService) {
      return selectedService === service.id;
    }
    // Check if the current pathname matches the service route exactly,
    // or if it's a sub-route (but not the root recharge page unless it's the target)
    return (
      pathname === service.route ||
      (service.route !== "/recharge" && pathname.startsWith(service.route))
    );
  };

  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-full border bg-background/50 p-2 backdrop-blur-sm">
      {services.map((service) => {
        const IconComponent = service.icon;
        const active = isActive(service);

        return (
          <Button
            key={service.id}
            variant={active ? "gradient" : "none"}
            size="sm"
            showRipple
            onClick={() => handleServiceClick(service)}
            disabled={service.comingSoon}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-full",
              service.comingSoon && "cursor-not-allowed opacity-50"
            )}
            title={service.name}
          >
            <IconComponent
              className="h-4 w-4"
              weight={active ? "fill" : iconWeight}
            />
            <span className="hidden sm:inline">{service.name}</span>
            {service.comingSoon && (
              <span className="ml-1 rounded bg-orange-500/20 px-1 text-xs text-orange-500">
                Soon
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default ServiceNavigation;
