import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("auth")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      username: string;
      email: string;
      iat: number;
      exp: number;
    };

    return NextResponse.json({
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
};
