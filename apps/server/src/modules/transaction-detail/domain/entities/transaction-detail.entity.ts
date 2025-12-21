import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity } from 'typeorm';

@Entity('transaction_details')
export class TransactionDetail extends BaseAuditEntity {
  @Column({ name: 'transaction_id', type: 'uuid' })
  transactionId!: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ type: 'varchar', length: 255 })
  note!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;
}
