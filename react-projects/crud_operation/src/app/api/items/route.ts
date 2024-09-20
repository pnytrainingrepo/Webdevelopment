// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { name, price } = await request.json();
  try {
    const result = await pool.query(
      'INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating item' }, { status: 500 });
  }
}
