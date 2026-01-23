import { Exclude, Expose, Transform } from 'class-transformer';

import { StoreResponse } from './store.response';
import { ProductResponse, ProductWithCategoryListResponse } from './product.response';

@Exclude()
export class CategoryResponse {
  @Expose() id!: string;
  @Expose() storeId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;
  @Expose() description?: string | null;
  @Expose() status!: string;

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CategoryWithStoreResponse {
  @Expose() id!: string;
  @Expose() storeId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;
  @Expose() description?: string | null;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) => new StoreResponse(obj.store))
  store!: StoreResponse;

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CategoryWithProductListResponse {
  @Expose() id!: string;
  @Expose() storeId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;
  @Expose() description?: string | null;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.products.length ? obj.products.map((product) => new ProductWithCategoryListResponse(product)) : [],
  )
  products!: ProductWithCategoryListResponse[];

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}
