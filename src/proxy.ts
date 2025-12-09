import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("accessToken")?.value;

  // Routes requiring login
  const authProtectedPaths = ["/premium", "/allpost"];

  // Admin-only routes
  const adminProtectedPaths = ["/dashboard"];

  const isAuthProtected = authProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isAdminProtected = adminProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // ❌ Not logged in → redirect to login with callbackUrl
  if (isAuthProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ❌ Not admin → redirect to home
  if (isAdminProtected) {
    const role = req.cookies.get("role")?.value;
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/premium", "/premium/:path*", "/dashboard/:path*", "/allpost"],
};
