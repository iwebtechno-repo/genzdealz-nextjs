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
  LightningIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ServiceNavigation from "@/components/recharge/service-navigation";

const ElectricityBillPage = () => {
  const router = useRouter();
  const [consumerNumber, setConsumerNumber] = useState<string>("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [billAmount, setBillAmount] = useState<string>("");
  const [consumerName, setConsumerName] = useState<string>("");
  const [billFetched, setBillFetched] = useState<boolean>(false);

  const electricityBoards = [
    { id: "mseb", name: "MSEB (Maharashtra)", state: "Maharashtra" },
    { id: "bseb", name: "BSEB (Bihar)", state: "Bihar" },
    { id: "pseb", name: "PSEB (Punjab)", state: "Punjab" },
    { id: "kseb", name: "KSEB (Kerala)", state: "Kerala" },
    { id: "tseb", name: "TSEB (Telangana)", state: "Telangana" },
    { id: "apseb", name: "APSEB (Andhra Pradesh)", state: "Andhra Pradesh" },
    { id: "gseb", name: "GSEB (Gujarat)", state: "Gujarat" },
    { id: "hseb", name: "HSEB (Haryana)", state: "Haryana" },
    { id: "uppcl", name: "UPPCL (Uttar Pradesh)", state: "Uttar Pradesh" },
    { id: "wbseb", name: "WBSEB (West Bengal)", state: "West Bengal" },
    { id: "bescom", name: "BESCOM (Karnataka)", state: "Karnataka" },
    { id: "tneb", name: "TNEB (Tamil Nadu)", state: "Tamil Nadu" },
  ];

  const handleFetchBill = () => {
    if (!consumerNumber || !selectedBoard) {
      toast.error("Please enter consumer number and select electricity board");
      return;
    }

    // Mock bill fetch
    setConsumerName("John Doe");
    setBillAmount("1,250");
    setBillFetched(true);
    toast.success("Bill details fetched successfully!");
  };

  const handlePayBill = () => {
    if (!billFetched) {
      toast.error("Please fetch bill details first");
      return;
    }

    toast.success("Electricity bill payment initiated successfully!");
    // Handle payment logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Service Navigation */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <ServiceNavigation
            layout="compact"
            selectedService="electricity"
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
              <LightningIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Electricity Bill</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-md mx-auto">
          <Card variant="gradient" className="p-6">
            <div className="space-y-6">
              {/* Consumer Number */}
              <div className="space-y-2">
                <Label htmlFor="consumerNumber">Consumer Number</Label>
                <Input
                  id="consumerNumber"
                  placeholder="Enter Consumer Number"
                  value={consumerNumber}
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  className="text-center text-lg font-mono"
                />
              </div>

              {/* Electricity Board Selection */}
              <div className="space-y-2">
                <Label>Electricity Board</Label>
                <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Electricity Board" />
                  </SelectTrigger>
                  <SelectContent>
                    {electricityBoards.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        <div className="flex flex-col">
                          <span>{board.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {board.state}
                          </span>
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
                disabled={!consumerNumber || !selectedBoard}
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
                      <span className="text-sm">Consumer Name:</span>
                      <span className="text-sm font-semibold">
                        {consumerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Consumer Number:</span>
                      <span className="text-sm font-mono">
                        {consumerNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bill Amount:</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{billAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Due Date:</span>
                      <span className="text-sm font-semibold text-red-500">
                        {new Date(
                          Date.now() + 15 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Pay Bill Button */}
              <Button
                variant="gradient"
                size="lg"
                showRipple
                onClick={handlePayBill}
                disabled={!billFetched}
                className="w-full"
                icon={{ icon: LightningIcon }}
              >
                Pay Bill ₹{billAmount || "0"}
              </Button>
            </div>
          </Card>

          {/* Info Card */}
          <Card variant="orange" className="p-4 mt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Important Notes</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Consumer number is printed on your electricity bill</li>
                <li>• Bill amount includes all applicable charges</li>
                <li>• Payment will be processed within 24 hours</li>
                <li>• Keep payment confirmation for your records</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ElectricityBillPage;
