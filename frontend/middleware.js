import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const secret = process.env.NEXTAUTH_SECRET;

  // Get NextAuth JWT token from the session cookie
  const token = await getToken({ req, secret });

  // Open paths that don't need auth
  const openPaths = [
    "/admin/login",
    "/admin/signup",
    "/api/auth", // login API
  ];

  if (req.nextUrl.pathname.startsWith("/admin") && !openPaths.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
