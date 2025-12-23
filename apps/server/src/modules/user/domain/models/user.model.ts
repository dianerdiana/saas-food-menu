import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserModel {
  @Expose()
  id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  username!: string;

  @Expose()
  email!: string;

  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}
