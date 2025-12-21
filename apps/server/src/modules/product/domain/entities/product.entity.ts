import { Store } from '@/modules/store/domain/entities/store.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('products')
export class Product extends BaseAuditEntity {
  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'varchar', length: 255 })
  image!: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  store!: Store;
}
