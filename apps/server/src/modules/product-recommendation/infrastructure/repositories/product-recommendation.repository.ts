import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductRecommendationEntity } from '../../domain/entities/product-recommendation.entity';

@Injectable()
export class ProductRecommendationRepository {
  constructor(
    @InjectRepository(ProductRecommendationEntity)
    private repository: Repository<ProductRecommendationEntity>,
  ) {}

  create(productRecommendation: Partial<ProductRecommendationEntity>) {
    return this.repository.create(productRecommendation);
  }

  async bulkSave(productRecommendations: ProductRecommendationEntity[]) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(ProductRecommendationEntity)
      .values(productRecommendations)
      .returning(['id'])
      .execute();
  }

  async hardDeleteByRecommendationId(recommendationId: string) {
    return await this.repository.delete({ recommendationId });
  }
}
