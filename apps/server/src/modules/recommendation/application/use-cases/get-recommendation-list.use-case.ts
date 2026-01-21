import { Injectable } from '@nestjs/common';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetRecommendationListUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  execute(pagination: PaginationDto, storeId?: string) {
    if (storeId) {
      return this.recommendationRepository.findAllByStoreId(pagination, storeId);
    }

    return this.recommendationRepository.findAll(pagination);
  }
}
