import { StoreResponse } from '@/modules/store/interface/responses/store.response';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export class ProductResponse {
  @Expose()
  id!: string;

  @Expose()
  productId!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  image?: string | null;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose()
  description?: string | null;

  @Expose()
  status!: string;

  @Expose()
  @Transform(({ obj }) => new StoreResponse(obj.store))
  store!: StoreResponse;

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}
