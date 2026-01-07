import type { Product } from '@/views/product/types/product.type';
import type { Store } from '@/views/store/types/store.type';

export type Recommendation = {
  id: string;
  name: string;
  store: Store;
  products: Product[];
};
