import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SubscriptionModel {
  @Expose()
  id!: string;

  @Expose()
  storeId!: string;

  @Expose()
  userId!: string;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  status!: string;

  constructor(partial: Partial<SubscriptionModel>) {
    Object.assign(this, partial);
  }
}
