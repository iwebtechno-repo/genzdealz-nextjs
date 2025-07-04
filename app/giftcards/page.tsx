"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type IconWeight } from "@phosphor-icons/react";
import {
  GiftIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  GameControllerIcon,
  CoffeeIcon,
  DeviceMobileIcon,
  FilmStripIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import ServiceNavigation from "@/components/recharge/service-navigation";

interface GiftCard {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  denominations: number[];
  discount?: number;
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
}

const GiftCardsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const giftCards: GiftCard[] = [
    {
      id: "amazon",
      name: "Amazon Gift Card",
      brand: "Amazon",
      image: "/images/giftcards/amazon.png",
      category: "shopping",
      denominations: [100, 250, 500, 1000, 2000, 5000],
      discount: 2,
      icon: ShoppingBagIcon,
    },
    {
      id: "flipkart",
      name: "Flipkart Gift Card",
      brand: "Flipkart",
      image: "/images/giftcards/flipkart.png",
      category: "shopping",
      denominations: [100, 200, 500, 1000, 2000, 5000],
      discount: 1.5,
      icon: ShoppingBagIcon,
    },
    {
      id: "myntra",
      name: "Myntra Gift Card",
      brand: "Myntra",
      image: "/images/giftcards/myntra.png",
      category: "shopping",
      denominations: [500, 1000, 2000, 3000],
      discount: 3,
      icon: ShoppingBagIcon,
    },
    {
      id: "steam",
      name: "Steam Wallet",
      brand: "Steam",
      image: "/images/giftcards/steam.png",
      category: "gaming",
      denominations: [100, 500, 1000, 2000],
      icon: GameControllerIcon,
    },
    {
      id: "google_play",
      name: "Google Play Gift Card",
      brand: "Google Play",
      image: "/images/giftcards/google-play.png",
      category: "gaming",
      denominations: [100, 200, 500, 1000, 1500],
      icon: GameControllerIcon,
    },
    {
      id: "starbucks",
      name: "Starbucks Gift Card",
      brand: "Starbucks",
      image: "/images/giftcards/starbucks.png",
      category: "food",
      denominations: [250, 500, 1000, 2000],
      discount: 5,
      icon: CoffeeIcon,
    },
    {
      id: "zomato",
      name: "Zomato Gift Card",
      brand: "Zomato",
      image: "/images/giftcards/zomato.png",
      category: "food",
      denominations: [200, 500, 1000, 2000],
      discount: 3,
      icon: CoffeeIcon,
    },
    {
      id: "airtel",
      name: "Airtel Digital Gift Card",
      brand: "Airtel",
      image: "/images/giftcards/airtel.png",
      category: "telecom",
      denominations: [149, 239, 399, 599, 999],
      discount: 5.5,
      icon: DeviceMobileIcon,
    },
    {
      id: "netflix",
      name: "Netflix Gift Card",
      brand: "Netflix",
      image: "/images/giftcards/netflix.png",
      category: "entertainment",
      denominations: [199, 499, 649, 799],
      icon: FilmStripIcon,
    },
    {
      id: "spotify",
      name: "Spotify Premium Gift Card",
      brand: "Spotify",
      image: "/images/giftcards/spotify.png",
      category: "entertainment",
      denominations: [119, 389, 719, 1189],
      icon: FilmStripIcon,
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: GiftIcon },
    { id: "shopping", name: "Shopping", icon: ShoppingBagIcon },
    { id: "gaming", name: "Gaming", icon: GameControllerIcon },
    { id: "food", name: "Food & Dining", icon: CoffeeIcon },
    { id: "telecom", name: "Telecom", icon: DeviceMobileIcon },
    { id: "entertainment", name: "Entertainment", icon: FilmStripIcon },
  ];

  const filteredGiftCards = giftCards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBuyGiftCard = (giftCard: GiftCard, amount: number) => {
    toast.success(`${giftCard.name} for ₹${amount} added to cart!`);
    // Handle purchase logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Service Navigation */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <ServiceNavigation
            layout="compact"
            selectedService="giftcards"
            showDescription={false}
          />
        </div>
      </div>

      {/* Header */}
      <div className="pb-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GiftIcon className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-bold">Gift Cards</h1>
            </div>
            <p className="text-muted-foreground">
              Perfect gifts for every occasion
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search gift cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "gradient" : "none"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGiftCards.map((giftCard) => {
            const IconComponent = giftCard.icon;
            return (
              <Card key={giftCard.id} variant="gradient" className="p-6">
                <div className="space-y-4">
                  {/* Brand Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-background/50 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{giftCard.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {giftCard.brand}
                      </p>
                    </div>
                    {giftCard.discount && (
                      <div className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs font-semibold">
                        {giftCard.discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Denominations */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Available Amounts</p>
                    <div className="grid grid-cols-3 gap-2">
                      {giftCard.denominations.map((amount) => (
                        <Button
                          key={amount}
                          variant="blue"
                          size="sm"
                          onClick={() => handleBuyGiftCard(giftCard, amount)}
                          className="text-xs"
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button
                    variant="gradient"
                    size="sm"
                    showRipple
                    onClick={() =>
                      handleBuyGiftCard(giftCard, giftCard.denominations[0])
                    }
                    className="w-full"
                    icon={{ icon: GiftIcon }}
                  >
                    Buy Gift Card
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredGiftCards.length === 0 && (
          <div className="text-center py-12">
            <GiftIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No gift cards found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCardsPage;
