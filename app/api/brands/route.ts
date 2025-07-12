import { NextResponse } from "next/server";

// GET /api/brands
// Optional query params:
//   search   – brand name search string
//   page     – page number (defaults to 1)
//   pageSize – items per page (defaults to 30)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") ?? "30", 10);

  // Legacy service expects these values in HTTP headers rather than query-params
  const upstreamHeaders = new Headers({
    page_size: pageSize.toString(),
    page: page.toString(),
    brand: search,
  });

  try {
    const res = await fetch(
      "https://flashweb.iweberp.com/api/getbrandsbyiweb",
      {
        method: "GET",
        headers: upstreamHeaders,
        // Prevent Next.js from caching – this data changes frequently
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch brands" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("/api/brands error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
