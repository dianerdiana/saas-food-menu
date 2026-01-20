import { Injectable, NotFoundException } from '@nestjs/common';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

@Injectable()
export class DeleteRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(id: string, userId: string) {
    const recommendation = await this.recommendationRepository.findById(id);

    if (!recommendation) throw new NotFoundException('Recommendation is not found');

    recommendation.deletedBy = userId;
    await this.recommendationRepository.save(recommendation);

    const updateResult = await this.recommendationRepository.deleteById(recommendation.id);

    return updateResult.affected && true;
  }
}
