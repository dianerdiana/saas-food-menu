import { Injectable } from '@nestjs/common';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

const defaultRecommendations = [
  { name: 'Menu Favorite', storeId: '' },
  { name: "Chef's Recommendation", storeId: '' },
];

@Injectable()
export class BulkCreateDefaultRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(storeId: string) {
    const recommendations = defaultRecommendations.map((recommendation) =>
      this.recommendationRepository.create({
        ...recommendation,
        storeId,
      }),
    );

    return await this.recommendationRepository.bulkSave(recommendations);
  }
}
