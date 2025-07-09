import { NextResponse } from "next/server";

// Interface for BBPS API response item
interface BBPSApiItem {
  circle?: string;
  operator?: string;
  operator_code?: string;
  [key: string]: unknown;
}

// Helper function to determine region by state name
function getRegionByState(stateName: string): string {
  const stateRegionMap: Record<string, string> = {
    "Andhra Pradesh": "South",
    Karnataka: "South",
    Kerala: "South",
    "Tamil Nadu": "South",
    Telangana: "South",
    Chennai: "South",
    Maharashtra: "West",
    Gujarat: "West",
    Rajasthan: "West",
    Goa: "West",
    Mumbai: "West",
    "Uttar Pradesh": "North",
    Punjab: "North",
    Haryana: "North",
    Delhi: "North",
    "Himachal Pradesh": "North",
    "Jammu & Kashmir": "North",
    "UP East": "North",
    "UP West": "North",
    "West Bengal": "East",
    Odisha: "East",
    Bihar: "East",
    Jharkhand: "East",
    Kolkata: "East",
    Assam: "Northeast",
    Manipur: "Northeast",
    Meghalaya: "Northeast",
    Mizoram: "Northeast",
    Nagaland: "Northeast",
    Tripura: "Northeast",
    "Madhya Pradesh": "Central",
    Chhattisgarh: "Central",
  };

  return stateRegionMap[stateName] || "Other";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _fallbackCircles = [
  { id: "AP", name: "Andhra Pradesh" },
  { id: "AS", name: "Assam" },
  { id: "BR", name: "Bihar" },
  { id: "CG", name: "Chhattisgarh" },
  { id: "DL", name: "Delhi" },
  { id: "GA", name: "Goa" },
  { id: "GJ", name: "Gujarat" },
  { id: "HR", name: "Haryana" },
  { id: "HP", name: "Himachal Pradesh" },
  { id: "JK", name: "Jammu & Kashmir" },
  { id: "JH", name: "Jharkhand" },
  { id: "KA", name: "Karnataka" },
  { id: "KL", name: "Kerala" },
  { id: "MP", name: "Madhya Pradesh" },
  { id: "MH", name: "Maharashtra" },
  { id: "MN", name: "Manipur" },
  { id: "ML", name: "Meghalaya" },
  { id: "MZ", name: "Mizoram" },
  { id: "NL", name: "Nagaland" },
  { id: "OR", name: "Odisha" },
  { id: "PB", name: "Punjab" },
  { id: "RJ", name: "Rajasthan" },
  { id: "SK", name: "Sikkim" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "TG", name: "Telangana" },
  { id: "TR", name: "Tripura" },
  { id: "UP", name: "Uttar Pradesh" },
  { id: "UT", name: "Uttarakhand" },
  { id: "WB", name: "West Bengal" },
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
        cache: "no-store", // Disable caching to get fresh data
      }
    );

    if (!response.ok) {
      // If the API call itself fails, return an error
      return new NextResponse(
        JSON.stringify({
          message: `Failed to fetch from BBPS API: ${response.statusText}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // Extract unique circles/states from the BBPS data
    const uniqueCircles = new Map();

    if (data && Array.isArray(data)) {
      data.forEach((item: BBPSApiItem) => {
        if (item.circle && !uniqueCircles.has(item.circle)) {
          uniqueCircles.set(item.circle, {
            id: item.circle.replace(/\s+/g, "").substring(0, 2).toUpperCase(),
            name: item.circle,
            region: getRegionByState(item.circle),
          });
        }
      });
    }

    const circles = Array.from(uniqueCircles.values());

    if (circles.length === 0) {
      // If no circles are found after processing, it's an issue with the data.
      return new NextResponse(
        JSON.stringify({ message: "No circles found in API response" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(circles);
  } catch (error) {
    console.error("Error in /api/recharge/circles:", error);

    // General server error
    return new NextResponse(
      JSON.stringify({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
