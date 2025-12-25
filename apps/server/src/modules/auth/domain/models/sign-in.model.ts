import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInModel {
  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  username!: string;

  @Expose()
  storeId!: string;

  constructor(partial: Partial<SignInModel>) {
    Object.assign(this, partial);
  }
}
