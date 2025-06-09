import { NextResponse } from "next/server";

export default function middleware(req) {
  const response = NextResponse.next();
  const token = req.cookies.get("token")?.value || null;
  const protectedPath = ["/dashboard", "/master"];

  const isProtected = protectedPath.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/", request.url));
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
  matcher: ["/api/:path*", "/dashboard/:path*", "/master/:path*"],
};
