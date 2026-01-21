import type { Product } from '@/views/product/types/product.type';

export type Recommendation = {
  id: string;
  name: string;
  displayMode: 'vertical' | 'horizontal';
  status: string;
  storeId: string;
};

export type RecommendationWithProducts = {
  id: string;
  name: string;
  displayMode: 'vertical' | 'horizontal';
  status: string;
  storeId: string;
  products: Product[];
};
