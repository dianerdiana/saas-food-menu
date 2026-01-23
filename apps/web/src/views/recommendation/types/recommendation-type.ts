import type { ProductWithCategories } from "@/views/product/types/product";

export type Recommendation = {
  id: string;
  name: string;
  displayMode: "vertical" | "horizontal";
  storeId: string;
  status: string;
};

export type RecommendationWithProductList = {
  id: string;
  name: string;
  displayMode: "vertical" | "horizontal";
  products: ProductWithCategories[];
  storeId: string;
  status: string;
};
