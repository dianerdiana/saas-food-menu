import type {
  Product,
  ProductWithCategories,
} from "@/views/product/types/product";

export type Category = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  description?: string | null;
  status: string;
};

export type CategoryWithProductList = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  description?: string | null;
  status: string;
  products: ProductWithCategories[];
};
