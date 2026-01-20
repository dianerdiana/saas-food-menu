import { BadRequestException, Injectable } from '@nestjs/common';

import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';
import { CreateRecommendationDto } from '../dtos/create-recommendation.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';

@Injectable()
export class CreateRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  create(dto: CreateRecommendationDto & ImageOptionalDto, userId: string) {
    const recommendation = this.recommendationRepository.create({
      ...dto,
      createdBy: userId,
      status: GENERAL_STATUS.active,
    });

    return recommendation;
  }

  async save(recommendation: RecommendationEntity, maxRecommendations: number | null) {
    const ownedRecommendationCount = await this.recommendationRepository.countAllOwned(recommendation.storeId);

    if (maxRecommendations !== null && ownedRecommendationCount >= maxRecommendations) {
      throw new BadRequestException('You already reached recommendation limit');
    }

    await this.recommendationRepository.save(recommendation);

    return recommendation;
  }
}
