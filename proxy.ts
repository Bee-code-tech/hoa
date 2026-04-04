import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"];
const ADMIN_ONLY_ROUTES = ["/dashboard/students", "/dashboard/payments", "/dashboard/courses/new"];
const AUTH_ROUTES = ["/login", "/signup", "/verify-otp"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;
  
  let user = null;
  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch (e) {
    console.error("Failed to parse user cookie in middleware");
  }

  const isAuthenticated = !!token;
  const isStudent = user?.role === "student";

  // 1. Protect Dashboard routes
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      // loginUrl.searchParams.set("callbackUrl", pathname); // Optional: redirect back after login
      return NextResponse.redirect(loginUrl);
    }

    // 2. Role-based verification: Students cannot access certain routes
    if (isStudent && ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // 3. Redirect authenticated users away from Auth pages
  if (isAuthenticated && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    const targetUrl = isStudent ? "/dashboard/my-courses" : "/dashboard";
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // 4. If a student tries to access the generic dashboard route, we can optionally redirect them to my-courses
  if (isAuthenticated && isStudent && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/my-courses", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/verify-otp"],
};
