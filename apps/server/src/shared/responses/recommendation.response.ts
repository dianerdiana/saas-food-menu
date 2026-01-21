import { Exclude, Expose, Transform } from 'class-transformer';
import { ProductResponse } from './product.response';
import { StoreResponse } from './store.response';

@Exclude()
export class RecommendationResponse {
  @Expose() id!: string;
  @Expose() storeId!: string;
  @Expose() name!: string;
  @Expose() displayMode!: string;
  @Expose() status!: string;
  constructor(partial: Partial<RecommendationResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class RecommendationWithProductListResponse {
  @Expose() id!: string;
  @Expose() storeId!: string;
  @Expose() name!: string;
  @Expose() displayMode!: string;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) => (obj.products.length ? obj.products.map((product) => new ProductResponse(product)) : []))
  products!: ProductResponse[];

  constructor(partial: Partial<RecommendationWithProductListResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class RecommendationWithStoreResponse {
  @Expose() id!: string;
  @Expose() storeId!: string;
  @Expose() name!: string;
  @Expose() displayMode!: string;
  @Expose() status!: string;

  @Expose()
  @Transform(({ obj }) => new StoreResponse(obj.store))
  store!: StoreResponse;

  constructor(partial: Partial<RecommendationWithStoreResponse>) {
    Object.assign(this, partial);
  }
}
