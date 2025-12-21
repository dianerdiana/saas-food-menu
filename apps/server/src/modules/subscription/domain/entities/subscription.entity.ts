import { Store } from '@/modules/store/domain/entities/store.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('subscriptions')
export class Subscription extends BaseAuditEntity {
  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startData!: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate!: Date;

  @ManyToOne(() => Store, (store) => store.subscriptions)
  @JoinColumn({ name: 'store_id' })
  store!: Store;
}
