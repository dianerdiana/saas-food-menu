import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductModel {
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
  price!: number;

  @Expose()
  description?: string | null;

  @Expose()
  status!: string;

  constructor(partial: Partial<ProductModel>) {
    Object.assign(this, partial);
  }
}
