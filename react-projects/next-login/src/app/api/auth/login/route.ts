import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// Initialize PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Login Handler
export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      // Find user by email
      const userResult = await client.query("SELECT * FROM users WHERE email = $1", [email]);

      if (userResult.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }

      const user = userResult.rows[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }

      // Create JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set cookie
      const cookie = serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1 hour
        path: "/",
      });

      return new NextResponse(
        JSON.stringify({ success: true, message: "Logged in successfully" }),
        {
          status: 200,
          headers: {
            "Set-Cookie": cookie,
            "Content-Type": "application/json",
          },
        }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
