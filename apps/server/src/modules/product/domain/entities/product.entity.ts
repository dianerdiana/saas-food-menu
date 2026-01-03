import { ProductCategoryEntity } from '@/modules/product-category/domain/entities/product-category.entity';
import { ProductIngredientEntity } from '@/modules/product-ingredient/domain/entities/product-ingredient.entity';
import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { TransactionDetailEntity } from '@/modules/transaction-detail/domain/entities/transaction-detail.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseAuditEntity {
  static readonly modelName = 'Product';

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

  @ManyToOne(() => StoreEntity, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;

  @OneToMany(() => ProductCategoryEntity, (productCategory) => productCategory.product)
  productCategories!: ProductCategoryEntity[];

  @OneToMany(() => ProductIngredientEntity, (productIngredient) => productIngredient.product)
  productIngredients!: ProductIngredientEntity[];

  @OneToMany(() => TransactionDetailEntity, (transactionDetail) => transactionDetail.product)
  transactionDetails!: TransactionDetailEntity[];
}
