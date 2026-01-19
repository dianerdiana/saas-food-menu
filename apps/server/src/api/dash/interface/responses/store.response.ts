import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StoreResponse {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  ownerId!: string;

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

  constructor(partial: Partial<StoreResponse>) {
    Object.assign(this, partial);
  }
}
