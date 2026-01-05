import { ProductResponse } from '@/modules/product/interface/responses/product.response';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class RecommendationWithProductsResponse {
  @Expose()
  id!: string;

  @Expose()
  storeId!: string;

  @Expose()
  name!: string;

  @Expose()
  displayMode!: string;

  @Expose()
  status!: string;

  @Expose()
  @Transform(({ obj }) =>
    Array.isArray(obj.productRecommendations)
      ? obj.productRecommendations.filter((pr) => pr.product).map((pr) => new ProductResponse(pr.product))
      : [],
  )
  products!: ProductResponse[];

  constructor(partial: Partial<RecommendationWithProductsResponse>) {
    Object.assign(this, partial);
  }
}
