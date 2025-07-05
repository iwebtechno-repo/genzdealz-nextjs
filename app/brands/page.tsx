"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShoppingBagIcon,
  SparkleIcon,
  MagnifyingGlassIcon,
  GiftIcon,
  StarIcon,
  TrendUpIcon,
  CurrencyDollarIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  image: string;
  cashback: string;
  discount?: string;
  category?: string;
  description?: string;
  featured?: boolean;
  trending?: boolean;
}

const BrandsStorePage = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Brands", icon: ShoppingBagIcon },
    { id: "fashion", name: "Fashion & Beauty", icon: StarIcon },
    { id: "food", name: "Food & Dining", icon: GiftIcon },
    { id: "electronics", name: "Electronics", icon: SparkleIcon },
    { id: "travel", name: "Travel & Lifestyle", icon: TrendUpIcon },
  ];

  // Mock data while we set up the real API integration
  const mockBrands: Brand[] = [
    {
      id: "1",
      name: "Amazon",
      image: "/api/placeholder/150/150",
      cashback: "Up to 5%",
      category: "electronics",
      description: "Get cashback on millions of products",
      featured: true,
      trending: true,
    },
    {
      id: "2",
      name: "Flipkart",
      image: "/api/placeholder/150/150",
      cashback: "Up to 7%",
      category: "electronics",
      description: "India's leading e-commerce platform",
      featured: true,
    },
    {
      id: "3",
      name: "Myntra",
      image: "/api/placeholder/150/150",
      cashback: "Up to 10%",
      category: "fashion",
      description: "Fashion and lifestyle shopping",
      trending: true,
    },
    {
      id: "4",
      name: "Zomato",
      image: "/api/placeholder/150/150",
      cashback: "Up to 8%",
      category: "food",
      description: "Food delivery and dining out",
    },
    {
      id: "5",
      name: "Swiggy",
      image: "/api/placeholder/150/150",
      cashback: "Up to 6%",
      category: "food",
      description: "Food delivery at your doorstep",
    },
    {
      id: "6",
      name: "MakeMyTrip",
      image: "/api/placeholder/150/150",
      cashback: "Up to 12%",
      category: "travel",
      description: "Book flights, hotels & holidays",
    },
  ];

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      // For now, use mock data
      // TODO: Replace with real API call to brands endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      setBrands(mockBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") return matchesSearch;

    return matchesSearch && brand.category === selectedCategory;
  });

  const handleBrandClick = (brand: Brand) => {
    router.push(`/brands/${brand.id}`);
  };

  const featuredBrands = brands.filter((brand) => brand.featured);

  return (
    <div className="min-h-screen bg-background pt-28">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <button
            onClick={() => router.push("/")}
            className="hover:text-primary transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-foreground">Brands Store</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <ShoppingBagIcon className="h-20 w-20 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              GenZDealZ.ai Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Shop with your favorite brands and earn amazing cashback on every
              purchase. Gift cards, deals, and exclusive offers - all in one
              place!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CurrencyDollarIcon className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm text-green-200">Max Cashback</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <ShoppingBagIcon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-green-200">Brands Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <GiftIcon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-green-200">Instant Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 focus:border-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "green" : "none"}
                  size="sm"
                  showRipple
                  onClick={() => setSelectedCategory(category.id)}
                  icon={{ icon: category.icon }}
                  className={`transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "ring-2 ring-green-500"
                      : ""
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      {featuredBrands.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Brands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredBrands.map((brand) => (
                <Card
                  key={brand.id}
                  variant="none"
                  showRipple
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg group"
                  onClick={() => handleBrandClick(brand)}
                >
                  <div className="p-4 text-center">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center overflow-hidden">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0OEM4NC4zMjk5IDQ4IDkyIDU1LjY3MDEgOTIgNjVDOTIgNzQuMzI5OSA4NC4zMjk5IDgyIDc1IDgyQzY1LjY3MDEgODIgNTggNzQuMzI5OSA1OCA2NUM1OCA1NS42NzAxIDY1LjY3MDEgNDggNzUgNDhaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNDUgMTAyQzQ1IDkzLjE2MzQgNTIuMTYzNCA4NiA2MSA4NkM2MS4yMDA4IDg2IDYxLjQwMDMgODYuMDAzNCA2MS41OTkyIDg2LjAwOTlMODguNDAwOCA4Ni4wMDk5Qzg4LjU5OTcgODYuMDAzNCA4OC43OTkyIDg2IDg5IDg2Qzk3LjgzNjYgODYgMTA1IDkzLjE2MzQgMTA1IDEwMkMxMDUgMTEwLjgzNyA5Ny44MzY2IDExOCA4OSAxMThINjFDNTIuMTYzNCAxMTggNDUgMTEwLjgzNyA0NSAxMDJaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K";
                          }}
                        />
                      </div>
                      <div className="absolute top-0 right-0">
                        <span className="bg-yellow-500 text-black text-xs px-1 py-0.5 rounded-full font-medium">
                          <StarIcon className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                    <h3
                      className="font-semibold text-sm mb-1"
                      title={brand.name}
                    >
                      {brand.name}
                    </h3>
                    <p className="text-xs text-green-600 font-medium">
                      {brand.cashback} Cashback
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Brands Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="p-6 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3 mx-auto"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBagIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No brands found</h3>
              <p className="text-muted-foreground mb-6">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBrands.map((brand) => (
                <Card
                  key={brand.id}
                  variant="none"
                  showRipple
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg group relative"
                  onClick={() => handleBrandClick(brand)}
                >
                  <div className="p-6 text-center h-full flex flex-col">
                    {/* Brand Logo */}
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center overflow-hidden">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0OEM4NC4zMjk5IDQ4IDkyIDU1LjY3MDEgOTIgNjVDOTIgNzQuMzI5OSA4NC4zMjk5IDgyIDc1IDgyQzY1LjY3MDEgODIgNTggNzQuMzI5OSA1OCA2NUM1OCA1NS42NzAxIDY1LjY3MDEgNDggNzUgNDhaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNDUgMTAyQzQ1IDkzLjE2MzQgNTIuMTYzNCA4NiA2MSA4NkM2MS4yMDA4IDg2IDYxLjQwMDMgODYuMDAzNCA2MS41OTkyIDg2LjAwOTlMODguNDAwOCA4Ni4wMDk5Qzg4LjU5OTcgODYuMDAzNCA4OC43OTkyIDg2IDg5IDg2Qzk3LjgzNjYgODYgMTA1IDkzLjE2MzQgMTA1IDEwMkMxMDUgMTEwLjgzNyA5Ny44MzY2IDExOCA4OSAxMThINjFDNTIuMTYzNCAxMTggNDUgMTEwLjgzNyA0NSAxMDJaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K";
                          }}
                        />
                      </div>

                      {/* Badges */}
                      {brand.trending && (
                        <div className="absolute -top-1 -right-1">
                          <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-medium flex items-center">
                            <TrendUpIcon className="h-3 w-3" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Brand Info */}
                    <div className="flex-grow">
                      <h3
                        className="font-semibold text-lg mb-2"
                        title={brand.name}
                      >
                        {brand.name}
                      </h3>

                      {brand.description && (
                        <p
                          className="text-xs text-muted-foreground mb-3 line-clamp-2"
                          title={brand.description}
                        >
                          {brand.description}
                        </p>
                      )}
                    </div>

                    {/* Cashback Info */}
                    <div className="mt-auto">
                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-center gap-1 text-green-700">
                          <CurrencyDollarIcon className="h-4 w-4" />
                          <span className="font-medium text-sm">
                            {brand.cashback}
                          </span>
                        </div>
                        <div className="text-xs text-green-600">Cashback</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Earning Cashback Today!
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already saving money with every purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="green"
              size="lg"
              showRipple
              onClick={() => router.push("/personalized")}
              icon={{ icon: SparkleIcon }}
            >
              Get Personalized Deals
            </Button>
            <Button
              variant="blue"
              size="lg"
              showRipple
              onClick={() => router.push("/giftcards")}
              icon={{ icon: GiftIcon }}
            >
              Browse Gift Cards
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandsStorePage;
