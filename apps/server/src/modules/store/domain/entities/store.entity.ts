import { BankEntity } from '@/modules/bank/domain/entities/bank.entity';
import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';
import { RecommendationEntity } from '@/modules/recommendation/domain/entities/recommendation.entity';
import { SubscriptionEntity } from '@/modules/subscription/domain/entities/subscription.entity';
import { TransactionEntity } from '@/modules/transaction/domain/entities/transaction.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('stores')
export class StoreEntity extends BaseAuditEntity {
  static readonly modelName = 'Store';

  @Column({ name: 'owner', type: 'uuid' })
  owner!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string | null;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  phone!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  latitude?: number | null;

  @Column({
    type: 'decimal',
    precision: 11, // Longitude need 1 more number (180)
    scale: 8,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  longitude?: number | null;

  @Column({ type: 'text', nullable: true })
  address?: string | null;

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

  @OneToMany(() => RecommendationEntity, (recommendation) => recommendation.store)
  recommendations!: RecommendationEntity[];
}
