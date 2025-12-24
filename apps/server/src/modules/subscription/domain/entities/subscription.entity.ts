import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { SubscriptionPaymentEntity } from '@/modules/subscription-payment/domain/entities/subscription-payment.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity extends BaseAuditEntity {
  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate!: Date;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @ManyToOne(() => StoreEntity, (store) => store.subscriptions)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => SubscriptionPaymentEntity, (subscriptionPayment) => subscriptionPayment.subscription)
  subscriptionPayments!: SubscriptionPaymentEntity[];
}
