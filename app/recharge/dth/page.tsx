"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TelevisionIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ServiceNavigation from "@/components/recharge/service-navigation";

const DTHRechargePage = () => {
  const router = useRouter();
  const [customerID, setCustomerID] = useState<string>("");
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const dthOperators = [
    {
      id: "tata_sky",
      name: "Tata Play (Tata Sky)",
      image: "/images/operators/tata-play.png",
    },
    { id: "dish_tv", name: "Dish TV", image: "/images/operators/dish-tv.png" },
    {
      id: "videocon",
      name: "Videocon D2H",
      image: "/images/operators/videocon.png",
    },
    {
      id: "sun_direct",
      name: "Sun Direct",
      image: "/images/operators/sun-direct.png",
    },
    {
      id: "airtel_digital",
      name: "Airtel Digital TV",
      image: "/images/operators/airtel-digital.png",
    },
  ];

  const handleRecharge = () => {
    if (!customerID || !selectedOperator || !amount) {
      toast.error("Please fill all required fields");
      return;
    }

    if (parseInt(amount) < 100) {
      toast.error("Minimum recharge amount is ₹100");
      return;
    }

    toast.success("DTH recharge initiated successfully!");
    // Handle recharge logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Service Navigation */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <ServiceNavigation
            layout="compact"
            selectedService="dth"
            showDescription={false}
          />
        </div>
      </div>

      {/* Header */}
      <div className="pb-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="gradient"
              size="icon"
              onClick={() => router.back()}
              showRipple
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <TelevisionIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">DTH Recharge</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-md mx-auto">
          <Card variant="gradient" className="p-6">
            <div className="space-y-6">
              {/* Customer ID */}
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID / Subscriber ID</Label>
                <Input
                  id="customerId"
                  placeholder="Enter Customer ID"
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                  className="text-center text-lg font-mono"
                />
              </div>

              {/* DTH Operator Selection */}
              <div className="space-y-2">
                <Label>DTH Operator</Label>
                <Select
                  value={selectedOperator}
                  onValueChange={setSelectedOperator}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select DTH Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {dthOperators.map((operator) => (
                      <SelectItem key={operator.id} value={operator.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={operator.image}
                            alt={operator.name}
                            className="w-6 h-6 rounded"
                          />
                          {operator.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Recharge Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter Amount (Min ₹100)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="100"
                  className="text-center text-lg font-mono"
                />
              </div>

              {/* Recharge Button */}
              <Button
                variant="gradient"
                size="lg"
                showRipple
                onClick={handleRecharge}
                disabled={!customerID || !selectedOperator || !amount}
                className="w-full"
                icon={{ icon: TelevisionIcon }}
              >
                Recharge DTH
              </Button>
            </div>
          </Card>

          {/* Info Card */}
          <Card variant="blue" className="p-4 mt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Quick Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Customer ID is usually 10-12 digits</li>
                <li>• Check your DTH account for exact Customer ID</li>
                <li>• Minimum recharge amount is ₹100</li>
                <li>• Recharge will be processed instantly</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DTHRechargePage;
