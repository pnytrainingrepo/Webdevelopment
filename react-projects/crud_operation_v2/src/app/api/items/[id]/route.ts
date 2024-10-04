// app/api/items/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { runMulter } from '@/lib/runMulter';
import { Item } from '@/interfaces/Item';
import path from 'path';
import fs from 'fs';

/**
 * Handles GET requests to fetch a single item by ID.
 */
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM items_updated WHERE id = $1', [id]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const item: Item = result.rows[0];
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Error fetching item' }, { status: 500 });
  }
};

/**
 * Handles PUT requests to update an existing item with optional image upload.
 */
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

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

    // Fetch existing item to handle image deletion
    const existing = await client.query('SELECT * FROM items_updated WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      client.release();
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    const existingItem: Item = existing.rows[0];

    // Update the item
    const updateQuery = `
      UPDATE items_updated
      SET name = $1, price = $2, description = $3, image_path = COALESCE($4, image_path), updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const values = [name, priceNumber, description, imagePath, id];
    const result = await client.query(updateQuery, values);
    client.release();

    const updatedItem: Item = result.rows[0];

    // If image was updated, delete the old image file
    if (imagePath && existingItem.image_path) {
      const oldImagePath = path.join(process.cwd(), 'public', existingItem.image_path);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: error.message || 'Error updating item' },
      { status: 500 }
    );
  }
};

/**
 * Handles DELETE requests to remove an item by ID.
 */
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const client = await pool.connect();

    // Fetch existing item to handle image deletion
    const existing = await client.query('SELECT * FROM items_updated WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      client.release();
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    const existingItem: Item = existing.rows[0];

    // Delete the item from the database
    await client.query('DELETE FROM items_updated WHERE id = $1', [id]);
    client.release();

    // Delete the image file if exists
    if (existingItem.image_path) {
      const imagePath = path.join(process.cwd(), 'public', existingItem.image_path);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Error deleting item' }, { status: 500 });
  }
};
