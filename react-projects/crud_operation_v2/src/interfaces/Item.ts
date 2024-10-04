// interfaces/Item.ts
export interface Item {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}
