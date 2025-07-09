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
  CreditCardIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CurrencyInrIcon,
  DeviceMobileIcon,
  TelevisionIcon,
  LightningIcon,
  CarIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ServiceNavigation from "@/components/recharge/service-navigation";

const CreditCardBillPage = () => {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [billAmount, setBillAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [cardholderName, setCardholderName] = useState<string>("");
  const [billFetched, setBillFetched] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState<string>("");

  const creditCardBanks = [
    {
      id: "sbi",
      name: "State Bank of India",
      image: "/images/operators/sbi-card.png",
    },
    { id: "hdfc", name: "HDFC Bank", image: "/images/operators/hdfc-card.png" },
    {
      id: "icici",
      name: "ICICI Bank",
      image: "/images/operators/icici-card.png",
    },
    { id: "axis", name: "Axis Bank", image: "/images/operators/axis-card.png" },
    { id: "citi", name: "Citibank", image: "/images/operators/citi-card.png" },
    {
      id: "amex",
      name: "American Express",
      image: "/images/operators/amex-card.png",
    },
    {
      id: "standard_chartered",
      name: "Standard Chartered",
      image: "/images/operators/sc-card.png",
    },
    {
      id: "kotak",
      name: "Kotak Mahindra Bank",
      image: "/images/operators/kotak-card.png",
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

  const handleCardNumberChange = (value: string) => {
    // Remove spaces and non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Add spaces every 4 digits for better readability
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (numericValue.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleFetchBill = () => {
    if (!cardNumber || !selectedBank) {
      toast.error("Please enter card number and select bank");
      return;
    }

    // Mock bill fetch
    setCardholderName("John Doe");
    setBillAmount("15,750");
    setDueDate(
      new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()
    );
    setPaymentAmount("15750");
    setBillFetched(true);
    toast.success("Credit card bill details fetched successfully!");
  };

  const handlePayBill = () => {
    if (!billFetched || !paymentAmount) {
      toast.error("Please fetch bill details and enter payment amount");
      return;
    }

    if (parseInt(paymentAmount) < 100) {
      toast.error("Minimum payment amount is ₹100");
      return;
    }

    toast.success("Credit card bill payment initiated successfully!");
    // Handle payment logic here
  };

  const getQuickPaymentAmounts = () => {
    if (!billAmount) return [];
    const totalBill = parseInt(billAmount.replace(/,/g, ""));
    return [
      { label: "Minimum Due", amount: Math.round(totalBill * 0.05) },
      { label: "50% of Bill", amount: Math.round(totalBill * 0.5) },
      { label: "Full Amount", amount: totalBill },
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Service Navigation */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <ServiceNavigation
            services={services}
            selectedService="credit-card"
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
              <CreditCardIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Credit Card Bill</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-md mx-auto">
          <Card variant="gradient" className="p-6">
            <div className="space-y-6">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Credit Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="text-center text-lg font-mono"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {cardNumber.replace(/\s/g, "").length}/16
                </div>
              </div>

              {/* Bank Selection */}
              <div className="space-y-2">
                <Label>Credit Card Bank</Label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {creditCardBanks.map((bank) => (
                      <SelectItem key={bank.id} value={bank.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={bank.image}
                            alt={bank.name}
                            className="w-6 h-6 rounded"
                          />
                          {bank.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fetch Bill Button */}
              <Button
                variant="blue"
                size="lg"
                showRipple
                onClick={handleFetchBill}
                disabled={!cardNumber || !selectedBank}
                className="w-full"
                icon={{ icon: MagnifyingGlassIcon }}
              >
                Fetch Bill Details
              </Button>

              {/* Bill Details */}
              {billFetched && (
                <Card variant="green" className="p-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <h3 className="font-semibold mb-2">Bill Details</h3>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cardholder Name:</span>
                      <span className="text-sm font-semibold">
                        {cardholderName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Card Number:</span>
                      <span className="text-sm font-mono">
                        ****{cardNumber.slice(-4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Bill Amount:</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{billAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Due Date:</span>
                      <span className="text-sm font-semibold text-red-500 flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {dueDate}
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Payment Amount */}
              {billFetched && (
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount">Payment Amount</Label>
                  <Input
                    id="paymentAmount"
                    type="number"
                    placeholder="Enter payment amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    min="100"
                    className="text-center text-lg font-mono"
                  />
                </div>
              )}

              {/* Quick Payment Buttons */}
              {billFetched && (
                <div className="space-y-2">
                  <Label>Quick Payment Options</Label>
                  <div className="grid gap-2">
                    {getQuickPaymentAmounts().map((option) => (
                      <Button
                        key={option.label}
                        variant="purple"
                        size="sm"
                        onClick={() =>
                          setPaymentAmount(option.amount.toString())
                        }
                        className="justify-between"
                      >
                        <span>{option.label}</span>
                        <span className="flex items-center gap-1">
                          <CurrencyInrIcon className="h-4 w-4" />
                          {option.amount.toLocaleString()}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay Bill Button */}
              <Button
                variant="gradient"
                size="lg"
                showRipple
                onClick={handlePayBill}
                disabled={!billFetched || !paymentAmount}
                className="w-full"
                icon={{ icon: CreditCardIcon }}
              >
                Pay Bill ₹
                {paymentAmount ? parseInt(paymentAmount).toLocaleString() : "0"}
              </Button>
            </div>
          </Card>

          {/* Warning Card */}
          <Card variant="orange" className="p-4 mt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">⚠️ Important Reminders</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pay before due date to avoid late fees</li>
                <li>• Minimum payment affects credit score</li>
                <li>• Payment reflects in 1-2 business days</li>
                <li>• Keep payment confirmation safe</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditCardBillPage;
