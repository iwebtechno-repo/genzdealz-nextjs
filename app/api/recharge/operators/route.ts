import { NextResponse } from "next/server";

// Interface for BBPS API response item
interface BBPSApiItem {
  circle?: string;
  operator?: string;
  operator_code?: string;
  [key: string]: unknown;
}

// Helper function to get operator discount
function getOperatorDiscount(operatorName: string): number {
  const discountMap: Record<string, number> = {
    Airtel: 2.5,
    Jio: 3.0,
    Vi: 2.0,
    Vodafone: 2.0,
    Idea: 2.0,
    BSNL: 1.5,
    Aircel: 1.0,
    MTNL: 1.5,
    Reliance: 2.0,
    Tata: 1.8,
    Uninor: 1.2,
    Videocon: 1.0,
  };

  // Find matching operator by checking if operator name contains any key
  for (const [key, discount] of Object.entries(discountMap)) {
    if (operatorName.toLowerCase().includes(key.toLowerCase())) {
      return discount;
    }
  }

  // Default discount for unknown operators
  return 1.5;
}

// Helper function to get operator image
function getOperatorImage(operatorName: string): string {
  const imageMap: Record<string, string> = {
    Airtel: "/images/operators/airtel.png",
    Jio: "/images/operators/jio.png",
    Vi: "/images/operators/vi.png",
    Vodafone: "/images/operators/vodafone.png",
    Idea: "/images/operators/idea.png",
    BSNL: "/images/operators/bsnl.png",
    Aircel: "/images/operators/aircel.png",
    MTNL: "/images/operators/mtnl.png",
    Reliance: "/images/operators/reliance.png",
    Tata: "/images/operators/tata.png",
  };

  // Find matching operator by checking if operator name contains any key
  for (const [key, image] of Object.entries(imageMap)) {
    if (operatorName.toLowerCase().includes(key.toLowerCase())) {
      return image;
    }
  }

  // Default operator image
  return "/images/operators/default.png";
}

// Fallback data if API fails
const fallbackOperators = [
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
    // Fetch real BBPS data from the API
    const response = await fetch(
      "https://flashweb.iweberp.com/api/getBBPSOptionsCodeOnly",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API response was not ok: ${response.status}`);
    }

    const data = await response.json();

    // Extract unique operators from the BBPS data
    const uniqueOperators = new Map();

    if (data && Array.isArray(data)) {
      data.forEach((item: BBPSApiItem) => {
        if (item.operator && !uniqueOperators.has(item.operator)) {
          // Generate discount based on operator name
          const discount = getOperatorDiscount(item.operator);

          uniqueOperators.set(item.operator, {
            id:
              item.operator_code ||
              item.operator.replace(/\s+/g, "").toLowerCase(),
            name: item.operator,
            image: getOperatorImage(item.operator),
            discount: discount,
            type: "prepaid",
            code:
              item.operator_code ||
              item.operator.replace(/\s+/g, "").toLowerCase(),
          });
        }
      });
    }

    const operators = Array.from(uniqueOperators.values());

    if (operators.length === 0) {
      throw new Error("No operators found in API response");
    }

    return NextResponse.json(operators);
  } catch (error) {
    console.error("Error fetching operators from BBPS API:", error);

    // Fallback to mock data if API fails
    return NextResponse.json(fallbackOperators);
  }
};
