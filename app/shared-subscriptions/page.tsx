"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  UsersIcon,
  SparkleIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShareIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SharedSubscription {
  id: string;
  name: string;
  dp: string;
  sharedPrice: number;
  duration: number;
  durationType: string;
  shareLimit: number;
  originalPrice?: number;
  category?: string;
  description?: string;
}

const SharedSubscriptionsPage = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<SharedSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSharedSubscriptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://flashweb.iweberp.com/api/shared-subscriptions",
        {
          method: "GET",
          redirect: "follow",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (
        data?.sharedSubscriptions &&
        Array.isArray(data.sharedSubscriptions)
      ) {
        setSubscriptions(data.sharedSubscriptions);
      } else {
        console.error("Invalid API response structure");
        toast.error("Failed to load shared subscriptions");
      }
    } catch (error) {
      console.error("Error fetching shared subscriptions:", error);
      toast.error("Failed to load shared subscriptions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubscriptionClick = (subscription: SharedSubscription) => {
    // Handle subscription purchase logic
    toast.success(
      `Interested in ${subscription.name}? Contact support for more details.`
    );
  };

  const calculateSavings = (originalPrice: number, sharedPrice: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - sharedPrice) / originalPrice) * 100);
  };

  const getBadgeColor = (shareLimit: number) => {
    if (shareLimit <= 2) return "bg-red-500";
    if (shareLimit <= 4) return "bg-orange-500";
    return "bg-green-500";
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
          <span className="text-foreground">Shared Subscriptions</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <UsersIcon className="h-20 w-20 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shared Subscriptions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Split the cost, share the benefits. Join our community and save up
              to 70% on your favorite subscriptions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CurrencyDollarIcon className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">70%</div>
                <div className="text-sm text-purple-200">Average Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <UsersIcon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">2-6</div>
                <div className="text-sm text-purple-200">People per Group</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <SparkleIcon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-purple-200">
                  Services Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="blue" className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Choose a Service
                </h3>
                <p className="text-blue-100">
                  Pick from our list of popular streaming, productivity, and
                  lifestyle subscriptions.
                </p>
              </div>
            </Card>

            <Card variant="green" className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Join a Group
                </h3>
                <p className="text-green-100">
                  We match you with other users to create sharing groups of 2-6
                  people.
                </p>
              </div>
            </Card>

            <Card variant="purple" className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Start Saving
                </h3>
                <p className="text-purple-100">
                  Pay only your share and enjoy the full service with massive
                  savings!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscriptions Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Available Subscriptions</h2>
            <p className="text-muted-foreground">
              {filteredSubscriptions.length} subscription
              {filteredSubscriptions.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="p-6">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3 mx-auto mb-4"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No subscriptions found
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Check back soon for new subscriptions!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSubscriptions.map((subscription) => (
                <Card
                  key={subscription.id}
                  variant="none"
                  showRipple
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg group"
                  onClick={() => handleSubscriptionClick(subscription)}
                >
                  <div className="p-6 text-center h-full flex flex-col">
                    {/* Service Logo */}
                    <div className="mb-4">
                      <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center overflow-hidden">
                        {subscription.dp ? (
                          <img
                            src={subscription.dp}
                            alt={subscription.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        ) : (
                          <SparkleIcon className="h-10 w-10 text-primary" />
                        )}
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="flex-grow">
                      <h3
                        className="font-semibold text-lg mb-2"
                        title={subscription.name}
                      >
                        {subscription.name}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <ClockIcon className="h-4 w-4" />
                          <span>
                            {subscription.duration} {subscription.durationType}
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getBadgeColor(
                              subscription.shareLimit
                            )}`}
                          >
                            {subscription.shareLimit} People Sharing
                          </span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary">
                          ₹{subscription.sharedPrice}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per person / {subscription.durationType}
                        </div>
                        {subscription.originalPrice && (
                          <div className="text-xs text-muted-foreground mt-1">
                            <span className="line-through">
                              ₹{subscription.originalPrice}
                            </span>
                            <span className="text-green-600 ml-2 font-medium">
                              {calculateSavings(
                                subscription.originalPrice,
                                subscription.sharedPrice
                              )}
                              % off
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="gradient"
                      showRipple
                      className="w-full"
                      icon={{ icon: ShareIcon }}
                    >
                      Join Group
                    </Button>
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
            Can't find what you're looking for?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Request a specific subscription and we'll try to add it to our
            platform!
          </p>
          <Button
            variant="blue"
            size="lg"
            showRipple
            onClick={() =>
              toast.info(
                "Feature coming soon! Contact support for specific requests."
              )
            }
          >
            Request Subscription
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SharedSubscriptionsPage;
