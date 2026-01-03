import { ProductEntity } from '@/modules/product/domain/entities/product.entity';
import { TransactionEntity } from '@/modules/transaction/domain/entities/transaction.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transaction_details')
export class TransactionDetailEntity extends BaseAuditEntity {
  static readonly modelName = 'TransactionDetail';

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

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.transactionDetails)
  @JoinColumn({ name: 'transaction_id' })
  transaction!: TransactionEntity;

  @ManyToOne(() => ProductEntity, (product) => product.transactionDetails)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;
}
