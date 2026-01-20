import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRecommendationRepository } from '../../infrastructure/repositories/product-recommendation.repository';

@Injectable()
export class GetProductRecommendationListService {
  constructor(private productRecommendationRepository: ProductRecommendationRepository) {}

  async execute(recommendationId?: string, productId?: string) {
    const productRecommendations = await this.productRecommendationRepository.findMany(recommendationId, productId);
    return productRecommendations;
  }
}
