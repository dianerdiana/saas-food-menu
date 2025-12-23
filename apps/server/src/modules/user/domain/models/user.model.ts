import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserModel {
  @Expose()
  id!: string;

  @Expose()
  @Transform(({ obj }) => `${obj.firstName}${obj.lastName ? ' ' + obj.lastName : ''}`)
  fullName!: string;

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

  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}
