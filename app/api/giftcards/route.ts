import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json(
        { message: "Missing mobile parameter" },
        { status: 400 }
      );
    }

    const base =
      process.env.EXTERNAL_COUPON_API_BASE || "https://flashweb.iweberp.com";

    const externalUrl = `${base}/api/brand_coupon?mobile_no=${mobile}`;
    const res = await fetch(externalUrl, { cache: "no-store" });

    if (!res.ok) {
      const data = await res.text();
      return NextResponse.json(
        { message: "Upstream error", details: data },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Giftcard proxy error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
