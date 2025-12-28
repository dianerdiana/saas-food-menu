import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class SignInModel {
  @Expose()
  id!: string;

  @Expose()
  @Transform(({ obj }) => `${obj.firstName}${obj.lastName ? ' ' + obj.lastName : ''}`)
  fullName!: string;

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
