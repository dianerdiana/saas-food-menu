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

  create(pr: Partial<ProductRecommendationEntity>) {
    return this.repository.create(pr);
  }

  async bulkSave(prs: ProductRecommendationEntity[]) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(ProductRecommendationEntity)
      .values(prs)
      .returning(['id'])
      .execute();
  }

  findMany(recommendationId?: string, productId?: string) {
    const query = this.repository.createQueryBuilder('pr');

    if (recommendationId) query.andWhere('pr.recommendation_id=:recommendationId', { recommendationId });
    if (productId) query.andWhere('pr.product_id=:productId', { productId });

    return query.getMany();
  }

  findManyByIds(recommendationIds?: string[], productIds?: string[]) {
    const query = this.repository.createQueryBuilder('pr');

    if (recommendationIds && recommendationIds.length) {
      query.andWhere('pr.recommendation_id IN (:...recommendationIds)', { recommendationIds });
    }

    if (productIds) {
      query.andWhere('pr.product_id IN (:...productIds)', { productIds });
    }

    return query.getMany();
  }

  findOne(recommendationId?: string, productId?: string) {
    const query = this.repository.createQueryBuilder('pr');

    if (recommendationId) {
      query.andWhere('pr.recommendation_id=:recommendationId', { recommendationId });
    } else if (productId) {
      query.andWhere('pr.product_id=:productId', { productId });
    }

    return query.getOne();
  }

  async hardDelete(recommendationId?: string, productId?: string) {
    if (recommendationId) return await this.repository.delete({ recommendationId });
    if (productId) return await this.repository.delete({ productId });
  }
}
