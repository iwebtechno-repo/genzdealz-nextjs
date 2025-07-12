import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

// GET /api/brands/:id -> proxies to getBrandDetails?brand_id=<id>
export async function GET(_req: Request, { params }: Params) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Brand id is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://flashweb.iweberp.com/api/getBrandDetails?brand_id=${encodeURIComponent(
        id
      )}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch brand details" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("/api/brands/[id] error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
