import type { Category } from '@/views/category/types/category.type';

export type Product = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  description?: string | null;
  status: string;
};

export type ProductWithCategory = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  description?: string | null;
  status: string;
  category: Category;
};
