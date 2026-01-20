import { Injectable, NotFoundException } from '@nestjs/common';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

@Injectable()
export class GetRecommendationByIdUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(id: string) {
    const recommendation = await this.recommendationRepository.findById(id);

    if (!recommendation) throw new NotFoundException('Recommendation not found');

    return recommendation;
  }
}
