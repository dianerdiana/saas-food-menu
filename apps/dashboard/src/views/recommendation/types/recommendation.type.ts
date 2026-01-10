import type { Product } from '@/views/product/types/product.type';
import type { Store } from '@/views/store/types/store.type';

export type Recommendation = {
  id: string;
  name: string;
  displayMode: 'vertical' | 'horizontal';
  status: string;
  store: Store;
  products: Product[];
};
