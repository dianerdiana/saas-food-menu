import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ProductRecommendationEntity } from '@/modules/product-recommendation/domain/entities/product-recommendation.entity';
import { StoreEntity } from '@/modules/store/domain/entities/store.entity';

import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { RECOMMENDATION_DISPLAY_MODE, RECOMMENDATION_STATUS } from '@/shared/constants/recommendation.constant';

@Entity('recommendations')
export class RecommendationEntity extends BaseAuditEntity {
  static readonly modelName = 'Recommendation';

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'display_mode', type: 'varchar', length: 255, default: RECOMMENDATION_DISPLAY_MODE.horizontal })
  displayMode!: string;

  @Column({ type: 'varchar', length: 255, default: RECOMMENDATION_STATUS.active })
  status!: string;

  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @ManyToOne(() => StoreEntity, (store) => store.recommendations)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;

  @OneToMany(() => ProductRecommendationEntity, (productRecommendation) => productRecommendation.recommendation)
  productRecommendations!: ProductRecommendationEntity[];
}
