import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { StoreResponse } from './store.response';
import { CategoryResponse } from './category.response';

@Exclude()
export class ProductResponse {
  @Expose() id!: string;
  @Expose() productId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose() description?: string | null;
  @Expose() status!: string;

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}

export class ProductWithStoreResponse {
  @Expose() id!: string;
  @Expose() productId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose() description?: string | null;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) => new StoreResponse(obj.store))
  store!: StoreResponse;

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ProductWithCategoryResponse {
  @Expose() id!: string;
  @Expose() productId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose() description?: string | null;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) => new CategoryResponse(obj.category))
  category!: CategoryResponse;

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ProductWithCategoryListResponse {
  @Expose() id!: string;
  @Expose() productId!: string;
  @Expose() name!: string;
  @Expose() slug!: string;
  @Expose() image?: string | null;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose() description?: string | null;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.categories.length ? obj.categories.map((category) => new CategoryResponse(category)) : [],
  )
  categories!: CategoryResponse[];

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}
