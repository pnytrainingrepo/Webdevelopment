// app/api/items/route.ts

import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM items ORDER BY id");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching items" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  const { name, description, price } = await request.json();
  try {
    const result = await client.query(
      "INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating item" }, { status: 500 });
  } finally {
    client.release();
  }
}
