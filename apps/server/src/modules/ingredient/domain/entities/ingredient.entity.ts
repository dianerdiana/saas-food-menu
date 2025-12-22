import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity } from 'typeorm';

@Entity('ingredients')
export class IngredientEntity extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;
}
