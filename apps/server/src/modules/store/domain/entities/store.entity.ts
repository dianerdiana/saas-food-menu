import { BankEntity } from '@/modules/bank/domain/entities/bank.entity';
import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';
import { SubscriptionEntity } from '@/modules/subscription/domain/entities/subscription.entity';
import { TransactionEntity } from '@/modules/transaction/domain/entities/transaction.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('stores')
export class StoreEntity extends BaseAuditEntity {
  @Column({ name: 'owner', type: 'uuid' })
  owner!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  image!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  phone!: string;

  @Column({ type: 'text', nullable: true })
  location?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50, default: GENERAL_STATUS.active })
  status!: string;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  @JoinColumn({ name: 'owner' })
  user!: UserEntity;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.store)
  subscriptions!: SubscriptionEntity[];

  @OneToMany(() => BankEntity, (bank) => bank.store)
  banks!: BankEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.store)
  categories!: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.store)
  products!: ProductEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.store)
  transactions!: TransactionEntity[];
}
