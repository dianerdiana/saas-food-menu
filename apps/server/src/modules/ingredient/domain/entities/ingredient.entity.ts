import { ProductIngredientEntity } from '@/modules/product-ingredient/domain/entities/product-ingredient.entity';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('ingredients')
export class IngredientEntity extends BaseAuditEntity {
  static readonly modelName = 'Ingredient';

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'int' })
  sequence!: number;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @OneToMany(() => ProductIngredientEntity, (productIngredient) => productIngredient.ingredient)
  productIngredients!: ProductIngredientEntity[];
}
