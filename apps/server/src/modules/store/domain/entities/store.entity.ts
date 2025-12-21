import { Bank } from '@/modules/bank/domain/entities/bank.entity';
import { Category } from '@/modules/category/domain/entities/category.entity';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { Subscription } from '@/modules/subscription/domain/entities/subscription.entity';
import { Transaction } from '@/modules/transaction/domain/entities/transaction.entity';
import { User } from '@/modules/user/domain/entities/user.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('stores')
export class Store extends BaseAuditEntity {
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
  location!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 50, default: GENERAL_STATUS.active })
  status!: string;

  @ManyToOne(() => User, (user) => user.stores)
  @JoinColumn({ name: 'owner' })
  user!: User;

  @OneToMany(() => Subscription, (subscription) => subscription.store)
  subscriptions!: Subscription[];

  @OneToMany(() => Bank, (bank) => bank.store)
  banks!: Bank[];

  @OneToMany(() => Category, (category) => category.store)
  categories!: Category[];

  @OneToMany(() => Product, (product) => product.store)
  products!: Product[];

  @OneToMany(() => Transaction, (transaction) => transaction.store)
  transactions!: Transaction[];
}
