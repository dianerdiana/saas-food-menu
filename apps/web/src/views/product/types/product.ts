import type { Category } from "@/views/category/types/category";

export type Product = {
  id: string;
  store_id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number;
};

export type ProductWithCategories = {
  id: string;
  store_id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number;
  categories: Category[];
};
