import { SubscriptionEntity } from '@/modules/subscription/domain/entities/subscription.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('subscription_payments')
export class SubscriptionPaymentEntity extends BaseAuditEntity {
  static readonly modelName = 'SubscriptionPayment';

  @Column({ name: 'subscription_id', type: 'uuid' })
  storeId!: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 100 })
  paymentMethod!: string;

  @Column({ type: 'varchar', length: 255 })
  proof!: string;

  @Column({ name: 'bank_account', type: 'varchar', length: 100 })
  bankAccount!: string;

  @Column({ name: 'bank_name', type: 'varchar', length: 100 })
  bankName!: string;

  @Column({ name: 'bank_number', type: 'varchar', length: 100 })
  bankNumber!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.subscriptionPayments)
  @JoinColumn({ name: 'subscription_id' })
  subscription!: SubscriptionEntity;
}
