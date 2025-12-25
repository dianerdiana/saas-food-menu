import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StoreModel {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  image?: string | null;

  @Expose()
  slug!: string;

  @Expose()
  phone!: string;

  @Expose()
  latitude?: number | null;

  @Expose()
  longitude?: number | null;

  @Expose()
  address?: string | null;

  @Expose()
  description?: string | null;

  @Expose()
  status!: string;

  constructor(partial: Partial<StoreModel>) {
    Object.assign(this, partial);
  }
}
