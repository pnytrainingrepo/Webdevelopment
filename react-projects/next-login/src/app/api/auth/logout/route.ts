import { NextResponse } from "next/server";
import { serialize } from "cookie";

export const POST = async () => {
  const cookie = serialize("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json({ success: true, message: "Logged out successfully" }, {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
};
