"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBagIcon,
  StarIcon,
  ArrowRightIcon,
  PercentIcon,
  TagIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Deal {
  brandId: string;
  brandName: string;
  category: string | null;
  description: string | null;
  discountFixed: number | null;
  discountPercentage: number | null;
  duration: string | null;
  durationType: string | null;
  feeFixed: number | null;
  feePercentage: number | null;
  id: string | null;
  image: string;
  imageBlurhash: string;
  maxDiscount: number;
  name: string | null;
  planPrice: number | null;
  shareLimit: number | null;
  sharedPrice: number | null;
  subCategory: string | null;
  title: string | null;
  url: string | null;
}

interface DealsGridProps {
  deals: Deal[];
  className?: string;
}

const DealsGrid = ({ deals, className }: DealsGridProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
          <ShoppingBagIcon className="h-5 w-5 text-white" weight="duotone" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Hot Deals</h2>
          <p className="text-muted-foreground">Exclusive offers just for you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal, index) => (
          <Card
            key={deal.brandId || index}
            variant="multi"
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative">
              {/* Deal Image */}
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 relative overflow-hidden">
                {deal.image ? (
                  <img
                    src={deal.image}
                    alt={deal.brandName}
                    className="w-full h-full object-cover transition-transform duration-300"
                    width={400}
                    height={225}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBagIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-[#d0427f] to-[#303293] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <PercentIcon className="h-3 w-3" />
                    {deal.maxDiscount}% OFF
                  </div>
                </div>
              </div>

              {/* Deal Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-lg text-foreground truncate"
                      title={deal.brandName}
                    >
                      {deal.brandName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {deal.category} • {deal.subCategory || "General"}
                    </p>
                  </div>

                  {/* Rating/Stars */}
                  <div className="flex items-center gap-1 ml-2">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-foreground">
                      {Math.floor(Math.random() * 2) + 4}.
                      {Math.floor(Math.random() * 9) + 1}
                    </span>
                  </div>
                </div>

                {/* Deal Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Up to {deal.maxDiscount}% discount available
                    </span>
                  </div>

                  {deal.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {deal.description}
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  variant="gradient"
                  size="sm"
                  showRipple
                  className="w-full transition-transform duration-200 cursor-pointer"
                  icon={{ icon: ArrowRightIcon }}
                >
                  View Deal
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-[#d0427f]/5 to-[#303293]/5 rounded-lg border border-[#d0427f]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
              <PercentIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {deals.length} deals available
              </p>
              <p className="text-xs text-muted-foreground">
                Average discount:{" "}
                {Math.round(
                  deals.reduce((acc, deal) => acc + deal.maxDiscount, 0) /
                    deals.length
                )}
                %
              </p>
            </div>
          </div>

          <Button
            variant="none"
            effect="glass"
            size="sm"
            showRipple
            icon={{ icon: ShoppingBagIcon }}
          >
            View All Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DealsGrid;
