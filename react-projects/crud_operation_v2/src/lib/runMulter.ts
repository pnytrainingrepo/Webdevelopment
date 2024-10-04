// lib/runMulter.ts
import upload from 'multer'
import { NextApiRequest } from 'next';

/**
 * Runs Multer middleware and returns a promise.
 * @param req - The incoming Next.js request.
 * @returns A promise that resolves when Multer has processed the request.
 */
export const runMulter = (req: NextApiRequest) => {
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    upload.single('image')(req as any, {} as any, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields: req.body, files: req.file });
    });
  });
};
