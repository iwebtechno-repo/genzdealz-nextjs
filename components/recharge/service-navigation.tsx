"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DeviceMobileIcon,
  TelevisionIcon,
  LightningIcon,
  CarIcon,
  CreditCardIcon,
  GiftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string; weight?: any }>;
  route: string;
  color: "blue" | "green" | "purple" | "orange" | "gradient";
  discount?: string;
  popular?: boolean;
  comingSoon?: boolean;
}

interface ServiceNavigationProps {
  selectedService?: string;
  onServiceSelect?: (serviceId: string) => void;
  showDescription?: boolean;
  layout?: "grid" | "list" | "compact";
}

const ServiceNavigation = ({
  selectedService,
  onServiceSelect,
  showDescription = true,
  layout = "grid",
}: ServiceNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const iconWeight = useIconWeight();
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services: ServiceOption[] = [
    {
      id: "mobile",
      name: "Mobile Recharge",
      description: "Instant recharge with best offers",
      icon: DeviceMobileIcon,
      route: "/recharge",
      color: "blue",
      discount: "Up to 5.5% off",
      popular: true,
    },
    {
      id: "dth",
      name: "DTH Recharge",
      description: "Quick DTH & cable TV recharge",
      icon: TelevisionIcon,
      route: "/recharge/dth",
      color: "green",
      discount: "Instant activation",
    },
    {
      id: "electricity",
      name: "Electricity Bill",
      description: "Pay electricity bills hassle-free",
      icon: LightningIcon,
      route: "/recharge/electricity",
      color: "orange",
      discount: "No convenience fee",
    },
    {
      id: "fastag",
      name: "FASTag Recharge",
      description: "Smooth highway travel",
      icon: CarIcon,
      route: "/recharge/fastag",
      color: "purple",
      discount: "24/7 available",
    },
    {
      id: "credit-card",
      name: "Credit Card Bill",
      description: "Pay bills before due date",
      icon: CreditCardIcon,
      route: "/recharge/credit-card",
      color: "gradient",
      discount: "Avoid late fees",
    },
    {
      id: "giftcards",
      name: "Gift Cards",
      description: "Perfect gifts for loved ones",
      icon: GiftIcon,
      route: "/giftcards",
      color: "gradient",
      discount: "Up to 10% off",
    },
  ];

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
    return (
      pathname === service.route ||
      (service.route !== "/recharge" && pathname.startsWith(service.route))
    );
  };

  if (layout === "compact") {
    return (
      <div className="flex gap-2 p-2 bg-background/50 backdrop-blur-sm rounded-full border overflow-x-auto">
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
                "flex items-center gap-2 whitespace-nowrap",
                service.comingSoon && "opacity-50 cursor-not-allowed"
              )}
            >
              <IconComponent
                className="h-4 w-4"
                weight={active ? "fill" : iconWeight}
              />
              <span className="hidden sm:inline">{service.name}</span>
              {service.comingSoon && (
                <span className="text-xs bg-orange-500/20 text-orange-500 px-1 rounded">
                  Soon
                </span>
              )}
            </Button>
          );
        })}
      </div>
    );
  }

  if (layout === "list") {
    return (
      <div className="space-y-3">
        {services.map((service) => {
          const IconComponent = service.icon;
          const active = isActive(service);
          const hovered = hoveredService === service.id;

          return (
            <Card
              key={service.id}
              variant={active ? service.color : "none"}
              className={cn(
                "p-4 cursor-pointer transition-all duration-300",
                service.comingSoon
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md",
                active && "ring-2 ring-primary/20 shadow-lg"
              )}
              onClick={() => handleServiceClick(service)}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              showRipple={!service.comingSoon}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <IconComponent
                    className="h-6 w-6"
                    weight={active || hovered ? "fill" : iconWeight}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{service.name}</h3>
                    {service.popular && (
                      <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                    {service.comingSoon && (
                      <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded-full font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {showDescription && (
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                  {service.discount && (
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                      {service.discount}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {active && (
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-500"
                      weight="fill"
                    />
                  )}
                  {!service.comingSoon && (
                    <ArrowRightIcon
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        hovered && "transform translate-x-1"
                      )}
                    />
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {services.map((service) => {
        const IconComponent = service.icon;
        const active = isActive(service);
        const hovered = hoveredService === service.id;

        return (
          <Card
            key={service.id}
            variant={active ? service.color : "none"}
            className={cn(
              "p-4 cursor-pointer transition-all duration-300 text-center relative overflow-hidden",
              service.comingSoon
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg hover:-translate-y-1",
              active && "ring-2 ring-primary/20 shadow-xl scale-105"
            )}
            onClick={() => handleServiceClick(service)}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
            showRipple={!service.comingSoon}
          >
            {/* Background decoration */}
            <div
              className={cn(
                "absolute -top-2 -right-2 w-16 h-16 rounded-full opacity-10 transition-transform duration-500",
                hovered && "scale-150"
              )}
            >
              <IconComponent className="w-full h-full" />
            </div>

            {/* Popular badge */}
            {service.popular && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-bold">
                HOT
              </div>
            )}

            {/* Coming soon badge */}
            {service.comingSoon && (
              <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-bold">
                SOON
              </div>
            )}

            <div className="relative z-10">
              <div
                className={cn(
                  "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300",
                  active
                    ? "bg-white/20 text-white"
                    : "bg-primary/10 text-primary",
                  hovered && !active && "bg-primary/20 scale-110"
                )}
              >
                <IconComponent
                  className="h-6 w-6"
                  weight={active || hovered ? "fill" : iconWeight}
                />
              </div>

              <h3
                className={cn(
                  "font-semibold text-sm mb-1 transition-colors duration-300",
                  active && "text-white"
                )}
              >
                {service.name}
              </h3>

              {showDescription && (
                <p
                  className={cn(
                    "text-xs text-muted-foreground transition-colors duration-300",
                    active && "text-white/80"
                  )}
                >
                  {service.description}
                </p>
              )}

              {service.discount && (
                <p
                  className={cn(
                    "text-xs font-medium mt-2 transition-colors duration-300",
                    active
                      ? "text-green-200"
                      : "text-green-600 dark:text-green-400"
                  )}
                >
                  {service.discount}
                </p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ServiceNavigation;
