import { NextRequest, NextResponse } from "next/server";

// Mock data for mobile operators
const operators = [
  {
    id: "airtel",
    name: "Airtel",
    image: "/images/operators/airtel.png",
    discount: 5.5,
  },
  {
    id: "jio",
    name: "Jio",
    image: "/images/operators/jio.png",
    discount: 4.5,
  },
  {
    id: "vi",
    name: "Vi (Vodafone Idea)",
    image: "/images/operators/vi.png",
    discount: 5.0,
  },
  {
    id: "bsnl",
    name: "BSNL",
    image: "/images/operators/bsnl.png",
    discount: 3.5,
  },
  {
    id: "mtnl",
    name: "MTNL",
    image: "/images/operators/mtnl.png",
    discount: 3.0,
  },
];

export const GET = async () => {
  try {
    // In a real application, you would fetch this from your database or external API
    return NextResponse.json(operators);
  } catch (error) {
    console.error("Error fetching operators:", error);
    return NextResponse.json(
      { error: "Failed to fetch operators" },
      { status: 500 }
    );
  }
};
