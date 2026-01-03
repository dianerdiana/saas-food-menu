import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { RecommendationEntity } from '@/modules/recommendation/domain/entities/recommendation.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';

import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';

@Entity('product_ingredients')
export class ProductRecommendationEntity extends BaseAuditEntity {
  static readonly modelName = 'ProductRecommendation';

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'recommendation_id', type: 'uuid' })
  recommendationId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.productRecommendations)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  @ManyToOne(() => RecommendationEntity, (recommendation) => recommendation.productRecommendations)
  @JoinColumn({ name: 'recommendation_id' })
  recommendation!: RecommendationEntity;
}
