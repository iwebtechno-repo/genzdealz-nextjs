"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type IconWeight } from "@phosphor-icons/react";
import {
  DeviceMobileIcon,
  LightningIcon,
  CreditCardIcon,
  XIcon,
  PlusIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QuickAction {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; weight?: IconWeight }>;
  route: string;
  color: string;
  inputPlaceholder: string;
  inputType?: string;
  maxLength?: number;
}

interface QuickActionsProps {
  className?: string;
}

const QuickActions = ({ className }: QuickActionsProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<QuickAction | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");

  const quickActions: QuickAction[] = [
    {
      id: "mobile",
      name: "Mobile Recharge",
      icon: DeviceMobileIcon,
      route: "/recharge",
      color: "bg-blue-500 hover:bg-blue-600",
      inputPlaceholder: "Enter mobile number",
      inputType: "tel",
      maxLength: 10,
    },
    {
      id: "electricity",
      name: "Electricity Bill",
      icon: LightningIcon,
      route: "/recharge/electricity",
      color: "bg-orange-500 hover:bg-orange-600",
      inputPlaceholder: "Enter consumer number",
      inputType: "text",
    },
    {
      id: "credit-card",
      name: "Credit Card",
      icon: CreditCardIcon,
      route: "/recharge/credit-card",
      color: "bg-purple-500 hover:bg-purple-600",
      inputPlaceholder: "Enter card number",
      inputType: "text",
      maxLength: 19,
    },
  ];

  const handleActionSelect = (action: QuickAction) => {
    setSelectedAction(action);
    setInputValue("");
  };

  const handleQuickSubmit = () => {
    if (!selectedAction || !inputValue.trim()) {
      toast.error("Please enter the required information");
      return;
    }

    // Validate input based on action type
    if (selectedAction.id === "mobile") {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(inputValue)) {
        toast.error("Please enter a valid mobile number");
        return;
      }
    }

    // Navigate with pre-filled data
    const params = new URLSearchParams();
    if (selectedAction.id === "mobile") {
      params.set("mobile", inputValue);
    } else if (selectedAction.id === "electricity") {
      params.set("consumer", inputValue);
    } else if (selectedAction.id === "credit-card") {
      params.set("card", inputValue);
    }

    router.push(`${selectedAction.route}?${params.toString()}`);
    setIsOpen(false);
    setSelectedAction(null);
    setInputValue("");
  };

  const handleInputChange = (value: string) => {
    if (!selectedAction) return;

    let formattedValue = value;

    // Format based on action type
    if (selectedAction.id === "mobile") {
      formattedValue = value.replace(/\D/g, "");
    } else if (selectedAction.id === "credit-card") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    if (
      selectedAction.maxLength &&
      formattedValue.length <= selectedAction.maxLength
    ) {
      setInputValue(formattedValue);
    } else if (!selectedAction.maxLength) {
      setInputValue(formattedValue);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className={cn("fixed bottom-20 right-4 z-40", className)}>
        <Button
          variant="gradient"
          size="icon"
          showRipple
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>

      {/* Quick Actions Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <Card
            variant="gradient"
            className="w-full max-w-md p-6 rounded-t-3xl animate-in slide-in-from-bottom duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Quick Actions
              </h3>
              <Button
                variant="none"
                size="icon-sm"
                onClick={() => {
                  setIsOpen(false);
                  setSelectedAction(null);
                  setInputValue("");
                }}
                className="text-white/80 hover:text-white"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            {!selectedAction ? (
              /* Action Selection */
              <div className="space-y-3">
                <p className="text-white/80 text-sm mb-4">
                  Choose a service for quick access
                </p>
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.id}
                      variant="none"
                      onClick={() => handleActionSelect(action)}
                      className="w-full flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white"
                      showRipple
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          action.color
                        )}
                      >
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{action.name}</span>
                    </Button>
                  );
                })}
              </div>
            ) : (
              /* Input Form */
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      selectedAction.color
                    )}
                  >
                    <selectedAction.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {selectedAction.name}
                    </h4>
                    <p className="text-white/60 text-sm">Enter details below</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Input
                    placeholder={selectedAction.inputPlaceholder}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    type={selectedAction.inputType}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    autoFocus
                  />

                  {selectedAction.maxLength && (
                    <div className="text-xs text-white/60 text-right">
                      {inputValue.length}/{selectedAction.maxLength}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="none"
                      onClick={() => {
                        setSelectedAction(null);
                        setInputValue("");
                      }}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                    >
                      Back
                    </Button>
                    <Button
                      variant="none"
                      onClick={handleQuickSubmit}
                      disabled={!inputValue.trim()}
                      className="flex-1 bg-white text-primary hover:bg-white/90 font-medium"
                      showRipple
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Quick Actions */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <ClockIcon className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/60">Recent</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="none"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs"
                  onClick={() => router.push("/recharge?mobile=9876543210")}
                >
                  9876***210
                </Button>
                <Button
                  variant="none"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs"
                  onClick={() =>
                    router.push("/recharge/electricity?consumer=123456789")
                  }
                >
                  Electricity
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default QuickActions;
