import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// List of protected routes
const protectedRoutes = ["/api/protected"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("auth")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid Token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
