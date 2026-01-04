import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserDataResponse {
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

  @Expose()
  permissions!: any[];

  constructor(partial: Partial<UserDataResponse>) {
    Object.assign(this, partial);
  }
}
