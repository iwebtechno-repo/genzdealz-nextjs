"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UsersIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import PageHeader from "@/components/ui/page-header";

interface SharedSubscription {
  id: string;
  name: string;
  provider: string;
  slots: number;
  slotsFilled: number;
  pricePerSlot: number;
  image: string;
  category: string;
}

const mockSubscriptions: SharedSubscription[] = [
  {
    id: "1",
    name: "Netflix Premium",
    provider: "Netflix",
    slots: 4,
    slotsFilled: 2,
    pricePerSlot: 200,
    image: "/api/placeholder/400/300",
    category: "Entertainment",
  },
  {
    id: "2",
    name: "Spotify Family",
    provider: "Spotify",
    slots: 6,
    slotsFilled: 5,
    pricePerSlot: 150,
    image: "/api/placeholder/400/300",
    category: "Music",
  },
  // Add more mock data...
];

const SharedSubscriptionsPage = () => {
  const handleJoin = (sub: SharedSubscription) => {
    toast.success(`Joining ${sub.name}...`);
    // Implement join logic
  };

  return (
    <>
      <div className="pt-20" />
      <PageHeader
        title="Shared Subscriptions"
        subtitle="Share and save on your favorite subscriptions."
      />

      {/* Hero Section */}
      <section className="mb-8 rounded-lg bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-8 text-white">
        <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold">Save Big with Group Subs</h2>
            <p className="mt-2 max-w-2xl text-lg text-purple-200">
              Join existing groups or create your own to share the cost of
              popular subscriptions like Netflix, Spotify, and more.
            </p>
          </div>
          <Button
            variant="none"
            effect="glass"
            size="lg"
            showRipple
            className="mt-6 md:mt-0"
            icon={{ icon: PlusCircleIcon }}
            onClick={() => toast.info("Feature coming soon!")}
          >
            Create a Group
          </Button>
        </div>
      </section>

      {/* Subscription Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSubscriptions.map((sub) => (
          <Card key={sub.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={sub.image}
                alt={sub.name}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                {sub.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{sub.name}</h3>
              <p className="text-sm text-muted-foreground">{sub.provider}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {sub.slotsFilled} / {sub.slots} slots filled
                  </span>
                </div>
                <div className="text-lg font-bold">
                  ₹{sub.pricePerSlot}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </div>
              <Button
                variant="blue"
                showRipple
                className="mt-4 w-full"
                onClick={() => handleJoin(sub)}
                disabled={sub.slotsFilled >= sub.slots}
              >
                {sub.slotsFilled >= sub.slots ? "Full" : "Join Now"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SharedSubscriptionsPage;
