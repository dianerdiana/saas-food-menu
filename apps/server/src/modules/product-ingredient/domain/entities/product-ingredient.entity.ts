import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity } from 'typeorm';

@Entity('product_ingredients')
export class ProductIngredients extends BaseAuditEntity {
  @Column({ name: 'product_id', type: 'varchar', length: 36 })
  productId!: string;

  @Column({ name: 'ingredient_id', type: 'varchar', length: 36 })
  ingredientId!: string;
}
