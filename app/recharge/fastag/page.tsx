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
import {
  CarIcon,
  ArrowLeftIcon,
  DeviceMobileIcon,
  TelevisionIcon,
  LightningIcon,
  CreditCardIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ServiceNavigation from "@/components/recharge/service-navigation";

const FastagRechargePage = () => {
  const router = useRouter();
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const fastagProviders = [
    {
      id: "paytm",
      name: "Paytm FASTag",
      image: "/images/operators/paytm-fastag.png",
    },
    {
      id: "icici",
      name: "ICICI Bank FASTag",
      image: "/images/operators/icici-fastag.png",
    },
    {
      id: "hdfc",
      name: "HDFC Bank FASTag",
      image: "/images/operators/hdfc-fastag.png",
    },
    {
      id: "sbi",
      name: "SBI FASTag",
      image: "/images/operators/sbi-fastag.png",
    },
    {
      id: "axis",
      name: "Axis Bank FASTag",
      image: "/images/operators/axis-fastag.png",
    },
    {
      id: "airtel",
      name: "Airtel Payments Bank FASTag",
      image: "/images/operators/airtel-fastag.png",
    },
    {
      id: "equitas",
      name: "Equitas Bank FASTag",
      image: "/images/operators/equitas-fastag.png",
    },
  ];

  const services = [
    {
      id: "mobile",
      name: "Mobile",
      icon: DeviceMobileIcon,
      route: "/recharge",
    },
    {
      id: "dth",
      name: "DTH",
      icon: TelevisionIcon,
      route: "/recharge/dth",
      comingSoon: true,
    },
    {
      id: "electricity",
      name: "Electricity",
      icon: LightningIcon,
      route: "/recharge/electricity",
      comingSoon: true,
    },
    {
      id: "fastag",
      name: "FASTag",
      icon: CarIcon,
      route: "/recharge/fastag",
      comingSoon: true,
    },
    {
      id: "credit-card",
      name: "Credit Card",
      icon: CreditCardIcon,
      route: "/recharge/credit-card",
      comingSoon: true,
    },
  ];

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service && !service.comingSoon) {
      router.push(service.route);
    }
  };

  const handleRecharge = () => {
    if (!vehicleNumber || !selectedProvider || !amount) {
      toast.error("Please fill all required fields");
      return;
    }

    if (parseInt(amount) < 100) {
      toast.error("Minimum recharge amount is ₹100");
      return;
    }

    toast.success("FASTag recharge initiated successfully!");
    // Handle recharge logic here
  };

  const handleVehicleNumberChange = (value: string) => {
    // Convert to uppercase and remove spaces/special characters
    const cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleanValue.length <= 10) {
      setVehicleNumber(cleanValue);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Service Navigation */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <ServiceNavigation
            services={services}
            selectedService="fastag"
            onServiceSelect={handleServiceSelect}
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
              <CarIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">FASTag Recharge</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-md mx-auto">
          <Card variant="gradient" className="p-6">
            <div className="space-y-6">
              {/* Vehicle Number */}
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                <Input
                  id="vehicleNumber"
                  placeholder="e.g., MH12AB1234"
                  value={vehicleNumber}
                  onChange={(e) => handleVehicleNumberChange(e.target.value)}
                  maxLength={10}
                  className="text-center text-lg font-mono uppercase"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {vehicleNumber.length}/10
                </div>
              </div>

              {/* FASTag Provider Selection */}
              <div className="space-y-2">
                <Label>FASTag Provider</Label>
                <Select
                  value={selectedProvider}
                  onValueChange={setSelectedProvider}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select FASTag Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {fastagProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-6 h-6 rounded"
                          />
                          {provider.name}
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

              {/* Quick Amount Buttons */}
              <div className="space-y-2">
                <Label>Quick Amount</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[200, 500, 1000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="blue"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="text-sm"
                    >
                      ₹{quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recharge Button */}
              <Button
                variant="gradient"
                size="lg"
                showRipple
                onClick={handleRecharge}
                disabled={!vehicleNumber || !selectedProvider || !amount}
                className="w-full"
                icon={{ icon: CarIcon }}
              >
                Recharge FASTag
              </Button>
            </div>
          </Card>

          {/* Info Card */}
          <Card variant="purple" className="p-4 mt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">FASTag Benefits</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• No waiting at toll plazas</li>
                <li>• Automatic toll deduction</li>
                <li>• Real-time balance updates</li>
                <li>• Valid across all toll plazas in India</li>
                <li>• 24/7 recharge facility</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FastagRechargePage;
