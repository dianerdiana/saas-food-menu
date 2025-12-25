import { StoreModel } from '@/modules/store/domain/models/store.model';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class SignInModel {
  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  username!: string;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.stores && obj.stores.length > 0) {
      return new StoreModel(obj.stores[0]).id;
    }
    return null;
  })
  storeId!: string;

  constructor(partial: Partial<SignInModel>) {
    Object.assign(this, partial);
  }
}
