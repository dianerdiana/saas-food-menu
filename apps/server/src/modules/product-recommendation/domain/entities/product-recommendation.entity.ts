import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { RecommendationEntity } from '@/modules/recommendation/domain/entities/recommendation.entity';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';

import { BaseEntity } from '@/shared/domains/entities/base.entity';

@Entity('product_recommendations')
export class ProductRecommendationEntity extends BaseEntity {
  static readonly modelName = 'ProductRecommendation';

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @Column({ name: 'recommendation_id', type: 'uuid' })
  recommendationId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.productRecommendations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;

  @ManyToOne(() => RecommendationEntity, (recommendation) => recommendation.productRecommendations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recommendation_id' })
  recommendation!: RecommendationEntity;
}
