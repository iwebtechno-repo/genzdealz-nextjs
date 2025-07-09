"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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
import PageHeader from "@/components/ui/page-header";

interface GiftCard {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  denominations: number[];
  discount?: number;
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
  meta?: {
    cardNumber: string;
    cardPin: string;
    expiry: string;
  };
}

interface UpstreamData {
  Cardno: string;
  CardPin: string;
  expiry: string;
  amount: string;
  brand: string;
  image: string;
  DISCOUNT?: string;
}
interface UpstreamItem {
  data: UpstreamData;
}

const GiftCardsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGiftCard, setSelectedGiftCard] = useState<GiftCard | null>(
    null
  );
  const [apiGiftCards, setApiGiftCards] = useState<GiftCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // On mount load cards from external API (legacy html reference)
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const mobileNumber = "9820251058";
        const response = await fetch(
          `https://flashweb.iweberp.com/api/giftcards?mobile=${mobileNumber}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const parsed: GiftCard[] = (data as UpstreamItem[]).map(
            (item, idx) => {
              const d = item.data;
              return {
                id: idx.toString(),
                name: d.brand?.split("?")[0] || "Gift Card",
                brand: d.brand?.split("?")[0] || "Brand",
                image: d.image || "/file.svg",
                category: "giftcard",
                denominations: [parseInt(d.amount)],
                discount: d.DISCOUNT ? parseFloat(d.DISCOUNT) : undefined,
                icon: GiftIcon,
                meta: {
                  cardNumber: d.Cardno,
                  cardPin: d.CardPin,
                  expiry: d.expiry,
                },
              };
            }
          );
          setApiGiftCards(parsed);
        }
      } catch (error) {
        console.error("Failed to fetch giftcards", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const giftCards: GiftCard[] = apiGiftCards;

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top spacing for navbar */}
      <div className="pt-20" />

      <PageHeader
        title="Gift Cards"
        subtitle="Perfect gifts for every occasion."
      />

      {/* Split Pane Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane */}
        <div className="w-80 flex-shrink-0 border-r border-border/50 flex flex-col overflow-y-auto">
          {/* Search and Category Filters */}
          <div className="p-4 space-y-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search gift cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "gradient" : "link"
                    }
                    effect="fill"
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    showRipple
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="truncate" title={category.name}>
                      {category.name}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Gift Card List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8 text-sm">
                Loading gift cards...
              </p>
            ) : filteredGiftCards.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">
                No gift cards found.
              </p>
            ) : (
              filteredGiftCards.map((card) => (
                <Button
                  key={card.id}
                  variant={
                    selectedGiftCard?.id === card.id ? "gradient" : "link"
                  }
                  effect="fill"
                  className="w-full justify-start gap-3 rounded-lg px-3 py-2"
                  onClick={() => setSelectedGiftCard(card)}
                  showRipple
                  title={card.name}
                >
                  <card.icon className="h-5 w-5" />
                  <span className="truncate flex-1" title={card.name}>
                    {card.name}
                  </span>
                  {card.discount && (
                    <span className="text-xs text-green-600 font-semibold">
                      {card.discount}%
                    </span>
                  )}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* Right Pane */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedGiftCard ? (
            <Card variant="none" effect="glass" className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <selectedGiftCard.icon className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">{selectedGiftCard.name}</h2>
              </div>

              {/* Thumbnail */}
              <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden relative">
                <Image
                  src={selectedGiftCard.image}
                  alt={selectedGiftCard.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Denominations */}
              <div className="space-y-2">
                <h3 className="font-semibold">Choose Amount</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGiftCard.denominations.map((amount) => (
                    <Button
                      key={amount}
                      variant="gradient"
                      effect="fill"
                      size="sm"
                      onClick={() =>
                        handleBuyGiftCard(selectedGiftCard, amount)
                      }
                      showRipple
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
              </div>
              {selectedGiftCard.discount && (
                <div className="text-sm text-green-600 font-semibold">
                  {selectedGiftCard.discount}% instant discount available
                </div>
              )}
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Select a gift card from the list to see details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;
