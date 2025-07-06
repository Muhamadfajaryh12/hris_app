import { NextResponse } from "next/server";

export default function middleware(req) {
  const response = NextResponse.next();
  const token = req.cookies.get("token")?.value || null;
  const section = req.cookies.get("section_id")?.value || null;

  const protectedPath = [
    "/admin",
    "/attendence",
    "/request_leave",
    "/training",
  ];

  if (
    protectedPath.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin") && section != 6) {
    return NextResponse.redirect(new URL("/attendence", req.url));
  }

  if (["/"].includes(req.nextUrl.pathname) && token && section == 6) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (["/"].includes(req.nextUrl.pathname) && token && section != 6) {
    return NextResponse.redirect(new URL("/attendence"));
  }

  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000/");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}

export const config = {
  matcher: [
    "/",
    "/api/:path*",
    "/admin/:path*",
    "/attendence/:path*",
    "/request_leave/:path*",
    "/training/:path*",
  ],
};
