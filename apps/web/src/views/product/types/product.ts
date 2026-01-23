import type { Category } from "@/views/category/types/category";

export type Product = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number;
  status: string;
};

export type ProductWithCategories = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  price: number;
  categories: Category[];
  status: string;
};
