"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
  DeviceMobileIcon,
  TelevisionIcon,
  LightningIcon,
  CarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import { useAuth } from "@/lib/auth-context";
// import { RechargeForm } from "@/components/recharge/recharge-form";
// import { ServiceTabs } from "@/components/recharge/service-tabs";
// import { PlanSelection } from "@/components/recharge/plan-selection";
// import { RechargeHistory } from "@/components/recharge/recharge-history";
// import { OTPModal } from "@/components/recharge/otp-modal";
// import { DiscountModal } from "@/components/recharge/discount-modal";
// import { OfferModal } from "@/components/recharge/offer-modal";
import { toast } from "sonner";
import {
  type ServiceOption,
  default as ServiceNavigation,
} from "@/components/recharge/service-navigation";
import QuickActions from "@/components/recharge/quick-actions";
import PageHeader from "@/components/ui/page-header";

// Types
interface OperatorData {
  id: string;
  name: string;
  image: string;
  discount?: number;
}

interface CircleData {
  id: string;
  name: string;
}

interface PlanData {
  id: string;
  price: number;
  oldPrice?: number;
  dataBenefit: string;
  talktime: string;
  validity: string;
  description: string;
  category: string;
}

const RechargePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // State management
  const [mobileNumber, setMobileNumber] = useState<string>(
    searchParams.get("mobile") || ""
  );
  const [selectedCircle, setSelectedCircle] = useState<string>("");
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [operators, setOperators] = useState<OperatorData[]>([]);
  const [circles, setCircles] = useState<CircleData[]>([]);
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [showPlans, setShowPlans] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(false);

  // Modal states
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [showDiscountModal, setShowDiscountModal] = useState<boolean>(false);
  const [showOfferModal, setShowOfferModal] = useState<boolean>(false);

  // Service options
  const services: ServiceOption[] = [
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

  // Fetch operators and circles on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [circlesResponse, operatorsResponse] = await Promise.all([
          fetch("/api/recharge/circles"),
          fetch("/api/recharge/operators"),
        ]);

        if (!circlesResponse.ok) {
          const errorData = await circlesResponse.json();
          throw new Error(errorData.message || "Failed to fetch circles");
        }
        const circlesData = await circlesResponse.json();
        setCircles(circlesData);

        if (!operatorsResponse.ok) {
          const errorData = await operatorsResponse.json();
          throw new Error(errorData.message || "Failed to fetch operators");
        }
        const operatorsData = await operatorsResponse.json();
        setOperators(operatorsData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load recharge data"
        );
      }
    };

    fetchInitialData();
  }, []);

  // Validate mobile number
  const validateMobileNumber = useCallback((number: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  }, []);

  // Handle mobile number change
  const handleMobileNumberChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setMobileNumber(numericValue);
    }
  };

  // Fetch plans based on selection
  const handleCheckPlans = async () => {
    if (
      !validateMobileNumber(mobileNumber) ||
      !selectedCircle ||
      !selectedOperator
    ) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsLoadingPlans(true);
    try {
      const response = await fetch("/api/recharge/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber,
          circle: selectedCircle,
          operator: selectedOperator,
        }),
      });

      if (response.ok) {
        const plansData = await response.json();
        setPlans(plansData);
        setShowPlans(true);
        setShowHistory(false);
        toast.success("Plans loaded successfully");
      } else {
        throw new Error("Failed to fetch plans");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load plans");
    } finally {
      setIsLoadingPlans(false);
    }
  };

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service && !service.comingSoon) {
      if (service.route !== pathname) {
        router.push(service.route);
      }
    }
  };

  // Handle recharge action
  const handleRecharge = (plan: PlanData) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setSelectedPlan(plan);
    setShowDiscountModal(true);
  };

  // Check if form is valid
  const isFormValid =
    validateMobileNumber(mobileNumber) && selectedCircle && selectedOperator;

  return (
    <>
      <div className="pt-20" />
      <PageHeader
        title="Recharge & Bills"
        subtitle="Quickly recharge your mobile, DTH, FASTag, and pay bills online."
      />

      <div className="mb-8 flex items-center justify-center">
        <ServiceNavigation
          services={services}
          selectedService="mobile"
          onServiceSelect={handleServiceSelect}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Recharge Form */}
        <div className="md:col-span-1">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Recharge your mobile</h3>
            <div className="space-y-4">
              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="space-y-1">
                  <Input
                    id="mobile"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => handleMobileNumberChange(e.target.value)}
                    maxLength={10}
                    className="text-center text-lg font-mono"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {mobileNumber.length}/10
                  </div>
                </div>
              </div>

              {/* Circle Selection */}
              <div className="space-y-2">
                <Label>Circle</Label>
                <Select
                  value={selectedCircle}
                  onValueChange={setSelectedCircle}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {circles.map((circle) => (
                      <SelectItem key={circle.id} value={circle.id}>
                        {circle.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Operator Selection */}
              <div className="space-y-2">
                <Label>Operator</Label>
                <Select
                  value={selectedOperator}
                  onValueChange={setSelectedOperator}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((operator) => (
                      <SelectItem key={operator.id} value={operator.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={operator.image}
                            alt={operator.name}
                            width={24}
                            height={24}
                            className="rounded"
                          />
                          {operator.name}
                          {operator.discount && (
                            <span className="text-xs text-green-500">
                              {operator.discount}% off
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Check Plans Button */}
              <Button
                variant="gradient"
                size="lg"
                showRipple
                onClick={handleCheckPlans}
                disabled={!isFormValid || isLoadingPlans}
                className="w-full"
                icon={{
                  icon: isLoadingPlans ? ClockIcon : MagnifyingGlassIcon,
                }}
              >
                {isLoadingPlans ? "Loading..." : "Check Plans"}
              </Button>

              {/* Selected Plan Display */}
              {selectedPlan && (
                <Card variant="blue" className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Selected Plan</span>
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-lg font-bold">
                      ₹{selectedPlan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedPlan.dataBenefit} • {selectedPlan.validity}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        </div>

        {/* Plans and History */}
        <div className="md:col-span-2">
          {showPlans && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <Card key={plan.id} variant="blue" className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold">₹{plan.price}</div>
                        <div className="text-sm text-muted-foreground">
                          {plan.dataBenefit} • {plan.validity}
                        </div>
                      </div>
                      <Button
                        variant="gradient"
                        size="sm"
                        showRipple
                        onClick={() => handleRecharge(plan)}
                      >
                        Recharge
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {showHistory && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Recent Recharges</h3>
                <p className="text-sm text-muted-foreground">
                  Your recent recharges will appear here.
                </p>
                {/* Placeholder for history items */}
                <div className="mt-4 flex flex-col items-center justify-center text-center text-muted-foreground">
                  <ClockIcon className="h-12 w-12" />
                  <p className="mt-2">No recharge history yet.</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modals - TODO: Create modal components */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card variant="gradient" className="p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">OTP Verification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter OTP sent to {mobileNumber}
            </p>
            <Button variant="gradient" onClick={() => setShowOTPModal(false)}>
              Close
            </Button>
          </Card>
        </div>
      )}

      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card variant="gradient" className="p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Discount Code</h3>
            <Input placeholder="Enter discount code" className="mb-4" />
            <div className="flex gap-2">
              <Button
                variant="gradient"
                onClick={() => setShowDiscountModal(false)}
              >
                Apply
              </Button>
              <Button
                variant="none"
                onClick={() => setShowDiscountModal(false)}
              >
                Skip
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card variant="gradient" className="p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">🎉 Special Offer!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get ₹50 off on recharges above ₹100
            </p>
            <Button variant="gradient" onClick={() => setShowOfferModal(false)}>
              Grab Now!
            </Button>
          </Card>
        </div>
      )}

      <QuickActions />
    </>
  );
};

const RechargePageWrapper = () => (
  <Suspense fallback={null}>
    <RechargePage />
  </Suspense>
);

export default RechargePageWrapper;
