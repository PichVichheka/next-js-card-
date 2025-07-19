import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isPublicPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // If the user is authenticated
  if (accessToken) {
    // If the user is on a public page (login/register), redirect to profile
    if (isPublicPage) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    // If the user is on the root path, redirect to profile
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
  // If the user is not authenticated
  else {
    // If the user is trying to access a protected page, redirect to login
    if (pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
