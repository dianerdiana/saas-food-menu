import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';

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
