import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryModel {
  @Expose()
  id!: string;

  @Expose()
  storeId!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  image!: string;

  @Expose()
  description?: string | null;

  @Expose()
  status!: string;

  constructor(partial: Partial<CategoryModel>) {
    Object.assign(this, partial);
  }
}
