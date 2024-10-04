// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { runMulter } from '@/lib/runMulter';
import { Item } from '@/interfaces/Item';

/**
 * Handles GET requests to fetch all items.
 */
export const GET = async (request: NextRequest) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM items_updated ORDER BY id ASC');
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
  }
};

/**
 * Handles POST requests to create a new item with image upload and description.
 */
export const POST = async (request: NextRequest) => {
  try {
    // Clone the request to use in runMulter
    const reqClone = request.clone();

    // Convert NextRequest to NextApiRequest-like object
    const req = {
      ...reqClone,
      body: {},
      file: undefined,
    } as any;

    // Run Multer to handle the multipart/form-data
    const { fields, files } = await runMulter(req);

    const { name, price, description } = fields;
    let imagePath: string | null = null;

    if (files && files.filename) {
      imagePath = `/uploads/${files.filename}`;
    }

    // Validate inputs
    if (!name || !price || !description) {
      return NextResponse.json(
        { error: 'Name, price, and description are required' },
        { status: 400 }
      );
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return NextResponse.json({ error: 'Price must be a number' }, { status: 400 });
    }

    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO items_updated (name, price, description, image_path)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [name, priceNumber, description, imagePath];

    const result = await client.query(insertQuery, values);
    client.release();

    const newItem: Item = result.rows[0];
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating item' },
      { status: 500 }
    );
  }
};
