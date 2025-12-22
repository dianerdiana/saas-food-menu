import { IngredientEntity } from '@/modules/ingredient/domain/entities/ingredient.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product_ingredients')
export class ProductIngredientEntity extends BaseAuditEntity {
  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'ingredient_id', type: 'uuid' })
  ingredientId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.productIngredients)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.productIngredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient!: IngredientEntity;
}
