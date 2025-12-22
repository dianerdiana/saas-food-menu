import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('banks')
export class BankEntity extends BaseAuditEntity {
  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @Column({ type: 'varchar', length: 100 })
  account!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  number!: string;

  @ManyToOne(() => StoreEntity, (store) => store.banks)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;
}
