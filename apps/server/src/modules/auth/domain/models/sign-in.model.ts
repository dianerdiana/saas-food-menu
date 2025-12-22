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

  constructor(partial: Partial<SignInModel>) {
    Object.assign(this, partial);
  }
}
