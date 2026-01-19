import { Exclude, Expose } from 'class-transformer';

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

  constructor(partial: Partial<RecommendationWithProductsResponse>) {
    Object.assign(this, partial);
  }
}
