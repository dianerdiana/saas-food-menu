import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity } from 'typeorm';

@Entity('product_categories')
export class ProductCategory extends BaseAuditEntity {
  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId!: string;
}
