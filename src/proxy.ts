import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutePrefixes = ["/dashboard"];
const publicRoutes = ["/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  const isProtectedRoute = protectedRoutePrefixes.some((routePrefix) =>
    pathname.startsWith(routePrefix),
  );

  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
  ],
};
