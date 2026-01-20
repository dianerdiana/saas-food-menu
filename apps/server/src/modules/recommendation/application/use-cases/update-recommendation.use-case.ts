import { Injectable, NotFoundException } from '@nestjs/common';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';
import { UpdateRecommendationDto } from '../dtos/update-recommendation.dto';

@Injectable()
export class UpdateRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(updateRecommendationDto: UpdateRecommendationDto, id: string, userId: string) {
    const { name, displayMode, storeId: recommendationStoreId } = updateRecommendationDto;

    const recommendation = await this.recommendationRepository.findById(id);
    if (!recommendation) throw new NotFoundException('Recommendation is not found');

    recommendation.name = name;
    recommendation.displayMode = displayMode;
    recommendation.updatedBy = userId;

    if (recommendationStoreId) recommendation.storeId = recommendationStoreId;

    await this.recommendationRepository.save(recommendation);

    return recommendation;
  }
}
