import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // If user is authenticated and tries to access /login or /register, redirect to /
  if ((pathname === "/login" || pathname === "/register") && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and tries to access /, redirect to /login
  if (pathname === "/" && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow other requests
  return NextResponse.next();
}

// Only run middleware on /, /login, and /register
export const config = {
  matcher: ["/", "/login", "/register"],
};
