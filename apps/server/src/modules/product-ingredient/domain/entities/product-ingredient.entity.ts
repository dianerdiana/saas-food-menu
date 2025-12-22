import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity } from 'typeorm';

@Entity('product_ingredients')
export class ProductIngredientEntity extends BaseAuditEntity {
  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'ingredient_id', type: 'uuid' })
  ingredientId!: string;
}
