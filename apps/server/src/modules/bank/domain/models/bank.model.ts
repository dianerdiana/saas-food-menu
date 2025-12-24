import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BankModel {
  @Expose()
  id!: string;

  @Expose()
  storeId!: string;

  @Expose()
  account!: string;

  @Expose()
  name!: string;

  @Expose()
  number!: string;

  @Expose()
  status!: string;

  constructor(partial: Partial<BankModel>) {
    Object.assign(this, partial);
  }
}
