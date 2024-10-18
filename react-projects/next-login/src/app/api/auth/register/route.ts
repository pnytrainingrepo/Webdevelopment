import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

// Initialize PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_NEON_URL,
});

// Registration Handler
export const POST = async (req: NextRequest) => {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const client = await pool.connect();
    try {
      const userCheck = await client.query(
        "SELECT * FROM users WHERE email = $1 OR username = $2",
        [email, username]
      );

      if (userCheck.rows.length > 0) {
        return NextResponse.json(
          { success: false, message: "User already exists" },
          { status: 409 }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      await client.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, hashedPassword]
      );

      return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
