import { Injectable } from '@nestjs/common';

import { GetProductByIdsUseCase } from '@/modules/product/application/use-cases/get-product-by-ids.use-case';
import { GetProductRecommendationListService } from '@/modules/product-recommendation/application/services/get-product-recommendation-list.service';
import { GetRecommendationByIdUseCase } from '@/modules/recommendation/application/use-cases/get-recommendation-by-id.use-case';

@Injectable()
export class GetRecommendationByIdDash {
  constructor(
    private getRecommendationByIdUseCase: GetRecommendationByIdUseCase,
    private getProductByIdsUseCase: GetProductByIdsUseCase,
    private getProductRecommendationService: GetProductRecommendationListService,
  ) {}

  async execute(recommendationId: string) {
    const productMap = new Map();

    const recommendation = await this.getRecommendationByIdUseCase.execute(recommendationId);
    const productRecommendations = await this.getProductRecommendationService.execute(recommendationId);

    if (productRecommendations.length) {
      const productIds = productRecommendations.map((pr) => pr.productId);
      const products = await this.getProductByIdsUseCase.execute(productIds);

      for (const product of products) {
        productMap.set(product.id, product);
      }
    }

    return {
      ...recommendation,
      products: Array.from(productMap.values()),
    };
  }
}
