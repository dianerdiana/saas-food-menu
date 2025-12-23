import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDetailModel {
  @Expose()
  id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  avatar!: string;

  @Expose()
  username!: string;

  @Expose()
  email!: string;

  @Expose()
  phone!: string;

  @Expose()
  status!: string;

  constructor(partial: Partial<UserDetailModel>) {
    Object.assign(this, partial);
  }
}
