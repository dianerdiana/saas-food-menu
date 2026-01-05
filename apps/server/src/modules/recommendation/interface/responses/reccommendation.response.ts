import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RecommendationResponse {
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

  constructor(partial: Partial<RecommendationResponse>) {
    Object.assign(this, partial);
  }
}
