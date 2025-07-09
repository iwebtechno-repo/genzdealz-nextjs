import { NextRequest, NextResponse } from "next/server";

// Interface for the request body
interface PlansRequestBody {
  mobileNumber?: string; // Not used by endpoint but kept for future validation/logging
  circle: string;
  operator: string;
}

// Helper: Build external URL for plans fetch
function buildPlansURL(operatorId: string, circleId: string) {
  // NOTE: The external BBPS endpoint does not require authentication but we still
  // proxy it through our backend so the client never sees it directly.
  const base =
    "https://flashweb.iweberp.com/api/getMobilePlansByOperatorAndCircle";
  const params = new URLSearchParams({ operatorId, circleId });
  return `${base}?${params.toString()}`;
}

export const POST = async (req: NextRequest) => {
  try {
    const { circle, operator } = (await req.json()) as PlansRequestBody;

    if (!circle || !operator) {
      return NextResponse.json(
        { error: "circle and operator are required" },
        { status: 400 }
      );
    }

    const url = buildPlansURL(operator, circle);

    const externalResp = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Revalidate frequently; these plans may change often.
      next: { revalidate: 60 * 10 }, // 10-minute cache
    });

    if (!externalResp.ok) {
      throw new Error(`External plans API error: ${externalResp.status}`);
    }

    const plans = await externalResp.json();

    return NextResponse.json(plans);
  } catch (err) {
    console.error("/api/recharge/plans error", err);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
};
