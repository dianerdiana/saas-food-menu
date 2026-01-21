import { Injectable } from '@nestjs/common';
import { ProductRecommendationRepository } from '../../infrastructure/repositories/product-recommendation.repository';

@Injectable()
export class GetProductRecommendationListByIdsService {
  constructor(private productRecommendationRepository: ProductRecommendationRepository) {}

  async execute(recommendationIds?: string[], productIds?: string[]) {
    const productRecommendations = await this.productRecommendationRepository.findManyByIds(
      recommendationIds,
      productIds,
    );

    return productRecommendations;
  }
}
