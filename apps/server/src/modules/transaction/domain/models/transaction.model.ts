import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TransactionModel {
  @Expose()
  id!: string;

  @Expose()
  storeId!: string;

  @Expose()
  name!: string;

  @Expose()
  tableNumber!: string;

  @Expose()
  paymentMethod!: string;

  @Expose()
  totalPrice!: number;

  @Expose()
  status!: string;

  constructor(partial: Partial<TransactionModel>) {
    Object.assign(this, partial);
  }
}
