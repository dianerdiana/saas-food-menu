import { Injectable } from '@nestjs/common';

import { ProductRecommendationRepository } from '../../infrastructure/repositories/product-recommendation.repository';

@Injectable()
export class AssignProductRecommendationService {
  constructor(private productRecommendationRepository: ProductRecommendationRepository) {}

  async assign(recommendationId: string, productIds: string[]) {
    await this.productRecommendationRepository.hardDelete(recommendationId);

    const productRecommendations = productIds.map((productId) =>
      this.productRecommendationRepository.create({
        recommendationId,
        productId,
      }),
    );

    await this.productRecommendationRepository.bulkSave(productRecommendations);
  }
}
