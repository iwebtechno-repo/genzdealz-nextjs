import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that are always accessible without authentication
// Everything *not* in this list (and matched by `config.matcher`) requires auth.
const publicRoutes = [
  "/",
  "/login",
  "/explore",
  "/deal-of-the-day",
  "/favicon.ico",
];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  const hasValidToken = token && token !== "" && token !== "undefined";

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Any route that is not explicitly public is considered protected.
  const requiresAuth = !isPublicRoute;

  // If user is authenticated and tries to access login page, check if they have a redirect
  if (hasValidToken && pathname === "/login") {
    const from = request.nextUrl.searchParams.get("from");
    if (from) {
      // If they have a redirect parameter, let them complete it
      return NextResponse.next();
    }
    // Otherwise redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and tries to access a protected route, redirect to login
  if (!hasValidToken && requiresAuth) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
};

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp)$).*)",
  ],
};
