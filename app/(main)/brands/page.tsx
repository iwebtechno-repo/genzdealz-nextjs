"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  FilmStripIcon,
  GameControllerIcon,
  FirstAidKitIcon,
  TShirtIcon,
  AirplaneIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useIconWeight } from "@/lib/morphy-ui/icon-theme-context";
import PageHeader from "@/components/ui/page-header";

interface Brand {
  id: string;
  name: string;
  image: string;
  cashback: string;
  description: string;
  category: string;
  discount?: string;
  featured?: boolean;
}

const categories = [
  { id: "all", name: "All", icon: UsersIcon },
  { id: "entertainment", name: "Entertainment", icon: FilmStripIcon },
  { id: "gaming", name: "Gaming", icon: GameControllerIcon },
  { id: "health", name: "Health", icon: FirstAidKitIcon },
  { id: "fashion", name: "Fashion", icon: TShirtIcon },
  { id: "travel", name: "Travel", icon: AirplaneIcon },
];

// Remote API returns an array like:
// {
//    brand_id: string,
//    brandName: string,
//    logoURL: string,
//    maxDiscount: number,
//    category?: string
// }

const mapUpstreamToBrand = (item: any): Brand => ({
  id: item.brand_id?.toString() ?? "",
  name: item.brandName ?? "Unknown",
  image: item.logoURL ?? "/file.svg",
  cashback: `${item.maxDiscount ?? 0}% CB`,
  category: (item.category ?? "general").toLowerCase(),
  description: "",
  discount: item.maxDiscount?.toString() ?? undefined,
});

const BrandsPage = () => {
  // const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const iconWeight = useIconWeight();

  // Debounce search input to avoid spamming API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch brands from internal API whenever the debounced search term changes
  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/brands?search=${encodeURIComponent(
            debouncedSearch
          )}&page=1&pageSize=60`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load brands");
        const data = await res.json();
        const parsed: Brand[] = Array.isArray(data)
          ? data.map(mapUpstreamToBrand)
          : [];
        setBrands(parsed);
      } catch (err) {
        console.error(err);
        toast.error("Unable to fetch brands. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [debouncedSearch]);

  const handleBrandClick = (brand: Brand) => {
    toast.info(`${brand.name} clicked`);
  };

  const filteredBrands = brands
    .filter(
      (brand) =>
        selectedCategory === "all" || brand.category === selectedCategory
    )
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Upstream API does not flag featured brands; keep empty or implement custom rule
  const featuredBrands: Brand[] = [];

  return (
    <>
      <div className="pt-20" />
      <PageHeader
        title="Brands Store"
        subtitle="Shop your favorite brands, earn cashback, and enjoy exclusive deals."
      />

      {/* Search and Filter Section */}
      <section className="mb-8 rounded-lg bg-muted/50 p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 border-2 pl-12 text-lg focus:border-primary"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "green" : "outline"}
              size="sm"
              showRipple
              onClick={() => setSelectedCategory(category.id)}
              icon={{ icon: category.icon, weight: iconWeight }}
              className="transition-all duration-200"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Brands Section */}
      {featuredBrands.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Featured Brands
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {featuredBrands.map((brand) => (
              <Card
                key={brand.id}
                variant="outline"
                showRipple
                className="group cursor-pointer p-4 text-center transition-all duration-200 hover:shadow-lg"
                onClick={() => handleBrandClick(brand)}
                title={brand.name}
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    width={80}
                    height={80}
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/150/150";
                    }}
                  />
                </div>
                <h3 className="truncate font-semibold" title={brand.name}>
                  {brand.name}
                </h3>
                <p className="text-sm font-bold text-green-500">
                  {brand.cashback}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Brands Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            {selectedCategory === "all"
              ? "All Brands"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-muted-foreground">
            {filteredBrands.length} brand
            {filteredBrands.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted"></div>
                  <div className="mb-2 h-4 rounded bg-muted"></div>
                  <div className="mx-auto h-3 w-2/3 rounded bg-muted"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="py-12 text-center">
            <ShoppingBagIcon className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No brands found</h3>
            <p className="mb-6 text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Check back soon for new brands!"}
            </p>
            <Button
              variant="green"
              showRipple
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              View All Brands
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBrands.map((brand) => (
              <Card
                key={brand.id}
                variant="outline"
                showRipple
                className="group cursor-pointer p-4 transition-all duration-200 hover:shadow-lg"
                onClick={() => handleBrandClick(brand)}
                title={brand.name}
              >
                <div className="relative mb-4">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-muted">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/150/150";
                      }}
                    />
                  </div>
                  {brand.discount && (
                    <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      {brand.discount} OFF
                    </div>
                  )}
                </div>
                <h3 className="truncate text-lg font-bold" title={brand.name}>
                  {brand.name}
                </h3>
                <p className="text-sm font-bold text-green-500">
                  {brand.cashback}
                </p>
                <p
                  className="mt-1 truncate text-xs text-muted-foreground"
                  title={brand.description}
                >
                  {brand.description}
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BrandsPage;
