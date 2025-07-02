import { NextRequest, NextResponse } from "next/server";

// Mock plans data
const generatePlans = (operator: string) => {
  const basePlans = [
    // Top-up plans
    {
      id: "topup_10",
      price: 10,
      dataBenefit: "Top-up",
      talktime: "₹7.47",
      validity: "NA",
      description: "Top-up recharge with main balance",
      category: "Topup",
    },
    {
      id: "topup_20",
      price: 20,
      dataBenefit: "Top-up",
      talktime: "₹14.95",
      validity: "NA",
      description: "Top-up recharge with main balance",
      category: "Topup",
    },
    // Data plans
    {
      id: "data_149",
      price: 149,
      oldPrice: 179,
      dataBenefit: "1GB/day",
      talktime: "Unlimited",
      validity: "24 days",
      description: "1GB data per day, Unlimited voice calls, 100 SMS/day",
      category: "Data",
    },
    {
      id: "data_239",
      price: 239,
      oldPrice: 299,
      dataBenefit: "1.5GB/day",
      talktime: "Unlimited",
      validity: "28 days",
      description: "1.5GB data per day, Unlimited voice calls, 100 SMS/day",
      category: "Data",
    },
    {
      id: "data_399",
      price: 399,
      oldPrice: 449,
      dataBenefit: "2.5GB/day",
      talktime: "Unlimited",
      validity: "28 days",
      description:
        "2.5GB data per day, Unlimited voice calls, 100 SMS/day, Disney+ Hotstar VIP",
      category: "Data",
    },
    {
      id: "data_719",
      price: 719,
      oldPrice: 799,
      dataBenefit: "1.5GB/day",
      talktime: "Unlimited",
      validity: "84 days",
      description: "1.5GB data per day, Unlimited voice calls, 100 SMS/day",
      category: "Data",
    },
    // Full talktime plans
    {
      id: "ft_95",
      price: 95,
      dataBenefit: "200MB",
      talktime: "₹70.42",
      validity: "28 days",
      description: "Full talktime recharge with 200MB data",
      category: "Full Talktime",
    },
    {
      id: "ft_181",
      price: 181,
      dataBenefit: "1GB",
      talktime: "₹141.84",
      validity: "30 days",
      description: "Full talktime recharge with 1GB data",
      category: "Full Talktime",
    },
    // Special recharge plans
    {
      id: "special_666",
      price: 666,
      oldPrice: 749,
      dataBenefit: "1.5GB/day",
      talktime: "Unlimited",
      validity: "77 days",
      description:
        "1.5GB data per day, Unlimited voice calls, 100 SMS/day, Disney+ Hotstar VIP for 3 months",
      category: "Special Recharge",
    },
    {
      id: "special_2999",
      price: 2999,
      oldPrice: 3499,
      dataBenefit: "2GB/day",
      talktime: "Unlimited",
      validity: "365 days",
      description:
        "2GB data per day, Unlimited voice calls, 100 SMS/day, Netflix Basic, Amazon Prime Video, Disney+ Hotstar VIP",
      category: "Special Recharge",
    },
    // 2G plans
    {
      id: "2g_99",
      price: 99,
      dataBenefit: "NA",
      talktime: "₹76.69",
      validity: "28 days",
      description: "Voice calls and SMS only",
      category: "2G",
    },
    {
      id: "2g_179",
      price: 179,
      dataBenefit: "1GB",
      talktime: "Unlimited",
      validity: "28 days",
      description: "Unlimited voice calls, 300 SMS, 1GB data",
      category: "2G",
    },
  ];

  // Adjust prices slightly based on operator for realism
  const priceMultiplier =
    operator === "jio" ? 0.95 : operator === "airtel" ? 1.05 : 1.0;

  return basePlans.map((plan) => ({
    ...plan,
    price: Math.round(plan.price * priceMultiplier),
    oldPrice: plan.oldPrice
      ? Math.round(plan.oldPrice * priceMultiplier)
      : undefined,
  }));
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { mobileNumber, circle, operator } = body;

    // Validate required fields
    if (!mobileNumber || !circle || !operator) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate mobile number format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return NextResponse.json(
        { error: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    // Generate plans based on operator and circle
    const plans = generatePlans(operator);

    // In a real application, you would:
    // 1. Call external recharge API (like BBPS)
    // 2. Store the request in your database
    // 3. Return actual plans from the provider

    return NextResponse.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
};
