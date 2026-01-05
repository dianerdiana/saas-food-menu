import { Injectable } from '@nestjs/common';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

const defaultRecommendations = [
  { name: 'Menu Favorite', storeId: '', displayMode: 'horizontal' },
  { name: "Chef's Recommendation", storeId: '', displayMode: 'vertical' },
];

@Injectable()
export class InitializeDefaultRecommendationService {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async initialize(storeId: string) {
    const recommendations = defaultRecommendations.map((recommendation) =>
      this.recommendationRepository.create({
        ...recommendation,
        storeId,
      }),
    );

    return await this.recommendationRepository.bulkSave(recommendations);
  }
}
