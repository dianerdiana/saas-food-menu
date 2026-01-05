import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product_categories')
export class ProductCategoryEntity extends BaseEntity {
  static readonly modelName = 'ProductCategory';

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.productCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.productCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;
}
