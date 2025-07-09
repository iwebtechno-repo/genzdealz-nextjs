"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendUpIcon,
  UsersThreeIcon,
  StorefrontIcon,
  StudentIcon,
  MapPinLineIcon,
  ChalkboardTeacherIcon,
  TShirtIcon,
  HeartbeatIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { type IconWeight } from "@phosphor-icons/react";

interface Category {
  id: string;
  name: string;
  description?: string;
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
  href: string;
  variant?: "gradient" | "blue" | "purple" | "green" | "orange" | "multi";
}

const categories: Category[] = [
  {
    id: "aiml",
    name: "AIML DealZ",
    icon: TrendUpIcon,
    href: "/explore/aiml",
    variant: "purple",
  },
  {
    id: "shared-subs",
    name: "Shared Subscription DealZ",
    icon: UsersThreeIcon,
    href: "/explore/shared-subscriptions",
    variant: "blue",
  },
  {
    id: "brands",
    name: "Big BrandZ DealZ",
    icon: StorefrontIcon,
    href: "/explore/brands",
    variant: "orange",
  },
  {
    id: "student",
    name: "Exclusive Student DealZ",
    icon: StudentIcon,
    href: "/explore/student",
    variant: "green",
  },
  {
    id: "hyperlocal",
    name: "AI-Hyperlocal DealZ",
    icon: MapPinLineIcon,
    href: "/explore/hyperlocal",
    variant: "gradient",
  },
  {
    id: "courses",
    name: "Courses & Jobs DealZ",
    icon: ChalkboardTeacherIcon,
    href: "/explore/courses-jobs",
    variant: "multi",
  },
  {
    id: "fashion",
    name: "Fashion DealZ",
    icon: TShirtIcon,
    href: "/explore/fashion",
    variant: "gradient",
  },
  {
    id: "health",
    name: "Health Product DealZ",
    icon: HeartbeatIcon,
    href: "/explore/health-products",
    variant: "blue",
  },
];

const ExplorePage = () => {
  const router = useRouter();

  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-center">
        Explore GenZDealZ Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            variant={cat.variant || "gradient"}
            showRipple
            className="flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => router.push(cat.href)}
            icon={{ icon: cat.icon, title: cat.name }}
          >
            <div>
              <h2 className="text-lg font-semibold truncate" title={cat.name}>
                {cat.name}
              </h2>
              {cat.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {cat.description}
                </p>
              )}
            </div>

            <Button
              variant="link"
              size="sm"
              showRipple={false}
              className="self-end mt-4 text-primary"
              onClick={(e) => {
                e.stopPropagation();
                router.push(cat.href);
              }}
              icon={{ icon: CaretRightIcon }}
            >
              View All
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
