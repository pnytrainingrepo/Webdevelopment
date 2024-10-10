import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // Since middleware already verified the token, you can proceed
  const user = req.cookies.get("auth")?.value;

  // Optionally, decode the token to get user info
  // const decoded = jwt.decode(user);

  return NextResponse.json({ success: true, message: "This is a protected route" }, { status: 200 });
};
