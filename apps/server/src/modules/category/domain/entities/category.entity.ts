import { ProductCategoryEntity } from '@/modules/product-category/domain/entities/product-category.entity';
import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseAuditEntity {
  static readonly modelName = 'Category';

  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @ManyToOne(() => StoreEntity, (store) => store.categories)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;

  @OneToMany(() => ProductCategoryEntity, (productCategory) => productCategory.category)
  productCategories!: ProductCategoryEntity[];
}
