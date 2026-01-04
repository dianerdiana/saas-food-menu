import { Exclude, Expose, Type } from 'class-transformer';

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
  image!: string;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose()
  description?: string | null;

  @Expose()
  status!: string;

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}
