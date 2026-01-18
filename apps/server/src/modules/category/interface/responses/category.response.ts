import { StoreResponse } from '@/modules/store/interface/responses/store.response';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CategoryResponse {
  @Expose()
  id!: string;

  @Expose()
  storeId!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  image?: string | null;

  @Expose()
  description?: string | null;

  @Expose()
  status!: string;

  @Expose()
  @Transform(({ obj }) => (obj.store ? new StoreResponse(obj.store) : undefined))
  store?: StoreResponse;

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}
