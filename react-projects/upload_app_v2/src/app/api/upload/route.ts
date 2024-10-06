import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Pool } from "pg";

//const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");
const UPLOAD_DIR = "public/uploads";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const fileName = (body.file as File).name;
    const filePath = path.resolve(UPLOAD_DIR, fileName);

    // Check if the file already exists in the database
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM uploads WHERE file_name = $1', [fileName]);
      if (result.rows.length > 0) {
        // File already exists
        return NextResponse.json({
          success: false,
          message: "File already exists",
        });
      }

      // Proceed with saving the file
      const buffer = Buffer.from(await file.arrayBuffer());

      // Ensure upload directory exists
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      // Save file to disk
      fs.writeFileSync(filePath, buffer);

      // Save file path to PostgreSQL
      await client.query('INSERT INTO uploads(file_name, file_path) VALUES($1, $2)', [fileName, filePath]);

      return NextResponse.json({
        success: true,
        name: fileName,
        path: filePath,
      });
    } finally {
      client.release();
    }
  } else {
    return NextResponse.json({
      success: false,
    });
  }
};
