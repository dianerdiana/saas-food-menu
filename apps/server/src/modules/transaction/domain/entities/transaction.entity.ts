import { Store } from '@/modules/store/domain/entities/store.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('transactions')
export class Transaction extends BaseAuditEntity {
  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'table_number', type: 'varchar', length: 50 })
  tableNumber!: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 100 })
  paymentMethod!: string;

  @Column({ name: 'total_price', type: 'decimal' })
  totalPrice!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @ManyToOne(() => Store, (store) => store.transactions)
  @JoinColumn({ name: 'store_id' })
  store!: Store;
}
