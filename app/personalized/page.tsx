"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SparkleIcon,
  TrendUpIcon,
  UserIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  TagIcon,
  GiftIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthState } from "@/hooks/use-auth-state";

// Interface for stored procedures API response
interface StoredProcedureDeal {
  title: string;
  url: string;
  imagePath: string;
  discount?: string;
  category?: string;
  details?: string;
}

// Interface for ML recommendation API response
interface MLRecommendationItem {
  title?: string;
  url?: string;
  image?: string;
  imagePath?: string;
  discount?: string;
  cashback?: string;
  category?: string;
  description?: string;
  details?: string;
  isSubspaceDeal?: boolean;
  brandName?: string;
  brand_id?: string;
}

interface PersonalizedDeal {
  title: string;
  url: string;
  image: string;
  discount: string;
  category?: string;
  description?: string;
  isSubspaceDeal?: boolean;
  brandName?: string;
  brandId?: string;
  cashback?: string;
}

const PersonalizedDealsPage = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthState();
  const [deals, setDeals] = useState<PersonalizedDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: SparkleIcon },
    { id: "beauty", name: "Beauty & Fashion", icon: StarIcon },
    { id: "gadgets", name: "Gadgets & Tech", icon: ShoppingBagIcon },
    { id: "food", name: "Food & Dining", icon: GiftIcon },
    { id: "courses", name: "Courses & Learning", icon: UserIcon },
  ];

  const fetchPersonalizedDeals = async () => {
    try {
      setIsLoading(true);

      // First, fetch the main deals
      const response = await fetch(
        "https://flashweb.iweberp.com/api/stored-procedures"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.stored_procedures && Array.isArray(data.stored_procedures)) {
        // Transform the deals to match our interface
        const transformedDeals: PersonalizedDeal[] = data.stored_procedures.map(
          (deal: StoredProcedureDeal) => ({
            title: deal.title,
            url: deal.url,
            image: deal.imagePath,
            discount: deal.discount || "Special Offer",
            category: deal.category,
            description: deal.details,
            isSubspaceDeal: false,
          })
        );

        // Try to fetch ML recommendations if user is authenticated
        if (isAuthenticated && user) {
          try {
            const mlResponse = await fetch(
              "https://flashweb.iweberp.com/api/sub_get_brands_ML_Recommend",
              {
                method: "GET",
                headers: {
                  deal_name: "personalized_recommendations",
                  "Content-Type": "application/json",
                },
              }
            );

            if (mlResponse.ok) {
              const mlData = await mlResponse.json();
              if (mlData?.data && Array.isArray(mlData.data)) {
                const mlDeals: PersonalizedDeal[] = mlData.data
                  .filter(
                    (item: MLRecommendationItem) =>
                      item && Object.keys(item).length > 0
                  )
                  .map((item: MLRecommendationItem) => ({
                    title: item.isSubspaceDeal ? item.brandName : item.title,
                    url: item.isSubspaceDeal
                      ? `/brands/${item.brand_id}`
                      : item.url,
                    image: item.image || item.imagePath,
                    discount:
                      item.discount || item.cashback || "Exclusive Deal",
                    category: item.category || "Featured",
                    description: item.description || item.details,
                    isSubspaceDeal: item.isSubspaceDeal,
                    brandName: item.brandName,
                    brandId: item.brand_id,
                    cashback: item.discount,
                  }));

                // Merge ML recommendations with general deals
                setDeals([...mlDeals, ...transformedDeals]);
                return;
              }
            }
          } catch {
            console.log(
              "ML recommendations not available, using general deals"
            );
          }
        }

        setDeals(transformedDeals);
      } else {
        console.error("Invalid API response structure");
        toast.error("Failed to load personalized deals");
      }
    } catch (error) {
      console.error("Error fetching personalized deals:", error);
      toast.error("Failed to load personalized deals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalizedDeals();
  }, [isAuthenticated, user]);

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") return matchesSearch;

    const categoryMatch =
      deal.category?.toLowerCase().includes(selectedCategory) || false;
    return matchesSearch && categoryMatch;
  });

  const handleDealClick = (deal: PersonalizedDeal) => {
    if (deal.isSubspaceDeal && deal.brandId) {
      router.push(`/brands/${deal.brandId}`);
    } else if (deal.url.includes("genzdealz.ai")) {
      // Handle internal URLs
      const url = new URL(deal.url);
      const searchParams = url.search;
      if (deal.url.includes("brands_store_detail")) {
        router.push(`/brands/detail${searchParams}`);
      } else {
        router.push(deal.url);
      }
    } else {
      // External URL
      window.open(deal.url, "_blank");
    }
  };

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
          <span className="text-foreground">Personalized Deals</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <SparkleIcon className="h-20 w-20 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isAuthenticated ? `Hey ${user?.name || "there"}!` : "Your"}{" "}
              Personalized Deals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              {isAuthenticated
                ? "We've curated these deals just for you based on your interests and preferences."
                : "Discover amazing deals tailored to your interests. Sign in for personalized recommendations!"}
            </p>
            {!isAuthenticated && (
              <Button
                size="lg"
                variant="gradient"
                showRipple
                onClick={() => router.push("/login")}
                icon={{ icon: UserIcon }}
              >
                Sign In for Better Recommendations
              </Button>
            )}
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
                placeholder="Search personalized deals..."
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
                  variant={selectedCategory === category.id ? "blue" : "none"}
                  size="sm"
                  showRipple
                  onClick={() => setSelectedCategory(category.id)}
                  icon={{ icon: category.icon }}
                  className={`transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "ring-2 ring-primary"
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

      {/* Deals Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === "all"
                ? "All Personalized Deals"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-muted-foreground">
              {filteredDeals.length} deal{filteredDeals.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="aspect-[16/9] bg-muted rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                    <div className="h-8 bg-muted rounded mt-4"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="text-center py-12">
              <SparkleIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No personalized deals found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Check back soon for new deals!"}
              </p>
              <Button
                variant="blue"
                showRipple
                onClick={() => router.push("/")}
              >
                Explore All Deals
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDeals.map((deal, index) => (
                <Card
                  key={index}
                  variant="none"
                  showRipple
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg group relative overflow-hidden"
                  onClick={() => handleDealClick(deal)}
                >
                  {/* Deal Image */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                      {deal.image ? (
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      ) : (
                        <SparkleIcon className="h-16 w-16 text-white" />
                      )}
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <TagIcon className="h-3 w-3" />
                        {deal.discount}
                      </span>
                    </div>

                    {/* Special Badge for Personalized */}
                    {isAuthenticated && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <SparkleIcon className="h-3 w-3" />
                          For You
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Deal Content */}
                  <div className="p-4">
                    <h3
                      className="font-semibold text-lg mb-2 line-clamp-1"
                      title={deal.title}
                    >
                      {deal.title}
                    </h3>

                    {deal.description && (
                      <p
                        className="text-sm text-muted-foreground mb-3 line-clamp-2"
                        title={deal.description}
                      >
                        {deal.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {deal.category && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {deal.category}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendUpIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Trending</span>
                      </div>
                    </div>

                    {deal.cashback && (
                      <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-green-700 font-medium">
                          💰 Extra {deal.cashback} Cashback
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Personalization Tips */}
      {isAuthenticated && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Getting Better Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="blue" className="text-center">
                  <div className="p-6">
                    <UserIcon className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="font-semibold mb-2 text-white">
                      Browse More
                    </h3>
                    <p className="text-blue-100 text-sm">
                      The more you explore, the better our AI understands your
                      preferences.
                    </p>
                  </div>
                </Card>

                <Card variant="green" className="text-center">
                  <div className="p-6">
                    <ShoppingBagIcon className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="font-semibold mb-2 text-white">
                      Make Purchases
                    </h3>
                    <p className="text-green-100 text-sm">
                      Your purchase history helps us recommend similar great
                      deals.
                    </p>
                  </div>
                </Card>

                <Card variant="purple" className="text-center">
                  <div className="p-6">
                    <StarIcon className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="font-semibold mb-2 text-white">
                      Rate Deals
                    </h3>
                    <p className="text-purple-100 text-sm">
                      Coming soon! Rate deals to get even better
                      recommendations.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PersonalizedDealsPage;
