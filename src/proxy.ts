import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
interface MyJwtPayload {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | "PREMIUM";
}

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  let user: MyJwtPayload | null = null;

  try {
    if (accessToken) {
      user = jwtDecode<MyJwtPayload>(accessToken);
    }
  } catch (e) {
    user = null;
  }
 
  const pathname = req.nextUrl.pathname;

  const authProtectedPaths = ["/premium", "/allpost", "/restaurant"];

  const adminProtectedPaths = ["/dashboard"];
  const isAuthProtected = authProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isAdminProtected = adminProtectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isAuthProtected && !user) {
    const loginUrl = new URL("/login", req.url);

    const redirectPath = req.nextUrl.pathname + req.nextUrl.search;
    loginUrl.searchParams.set("callbackUrl", redirectPath);

    return NextResponse.redirect(loginUrl);
  }

  if (isAdminProtected && (!user || user.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/premium", "/dashboard/:path*", "/allpost", "/restaurant"],
};
