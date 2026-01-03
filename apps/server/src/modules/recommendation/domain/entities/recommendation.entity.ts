import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ProductRecommendationEntity } from '@/modules/product-recommendation/domain/entities/product-recommendation.entity';
import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';

import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';

@Entity()
export class RecommendationEntity extends BaseAuditEntity {
  static readonly moduleName = 'Recommendation';

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, default: GENERAL_STATUS.active })
  status!: string;

  @Column({ name: 'store_id', type: 'uuid' })
  storeId!: string;

  @ManyToOne(() => StoreEntity, (store) => store.recommendations)
  @JoinColumn({ name: 'store_id' })
  store!: StoreEntity;

  @OneToMany(() => ProductRecommendationEntity, (productRecommendation) => productRecommendation.recommendation)
  productRecommendations!: ProductRecommendationEntity[];
}
