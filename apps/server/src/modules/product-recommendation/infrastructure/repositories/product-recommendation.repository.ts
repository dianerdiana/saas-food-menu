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

  findMany(recommendationId?: string, productId?: string) {
    const query = this.repository.createQueryBuilder('productRecommendation');

    if (recommendationId) query.andWhere('recommendation_id=:recommendationId', { recommendationId });
    if (productId) query.andWhere('product_id=:productId', { productId });

    return query.getMany();
  }

  findOne(recommendationId?: string, productId?: string) {
    const query = this.repository.createQueryBuilder('productRecommendation');

    if (recommendationId) {
      query.andWhere('recommendation_id=:recommendationId', { recommendationId });
    } else if (productId) {
      query.andWhere('product_id=:productId', { productId });
    }

    return query.getOne();
  }

  async hardDelete(recommendationId?: string, productId?: string) {
    if (recommendationId) return await this.repository.delete({ recommendationId });
    if (productId) return await this.repository.delete({ productId });
  }
}
