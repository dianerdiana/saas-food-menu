import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInModel {
  @Expose()
  id!: string;

  @Expose()
  avatar!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  username!: string;

  @Expose()
  stores!: StoreEntity[];

  constructor(partial: Partial<SignInModel>) {
    Object.assign(this, partial);
  }
}
