"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { GiftIcon } from "@phosphor-icons/react";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";

interface DealData {
  title: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
  code: string;
}

const dealOfTheDay: DealData = {
  title: "Exclusive Student Discount",
  description: "Get 50% off on premium courses and certifications!",
  image: "/images/deal-of-the-day.jpg",
  discount: "50% OFF",
  validUntil: "2024-12-31",
  code: "STUDENT50",
};

const DealOfTheDayPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card variant="gradient" className="max-w-2xl w-full p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
            <GiftIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">
            <GradientText variant="gradient">Deal of the Day</GradientText>
          </h1>
        </div>

        {/* Deal Details */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Thumbnail with placeholder */}
          <div className="aspect-square bg-muted flex items-center justify-center rounded-lg overflow-hidden">
            <GiftIcon className="h-16 w-16 text-muted-foreground" />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{dealOfTheDay.title}</h2>
            <p className="text-muted-foreground">{dealOfTheDay.description}</p>
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="text-primary">{dealOfTheDay.discount}</span>
              <span className="text-xs text-muted-foreground">
                until {dealOfTheDay.validUntil}
              </span>
            </div>
            <Button variant="blue" effect="fill" size="lg" showRipple>
              Use Code: {dealOfTheDay.code}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DealOfTheDayPage;
