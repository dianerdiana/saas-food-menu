import { IngredientEntity } from '@/modules/ingredient/domain/entities/ingredient.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product_ingredients')
export class ProductIngredientEntity extends BaseEntity {
  static readonly modelName = 'ProductIngredient';

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'ingredient_id', type: 'uuid' })
  ingredientId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.productIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.productIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient!: IngredientEntity;
}
