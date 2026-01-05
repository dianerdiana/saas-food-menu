import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class GetRecommendationByIdUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    let recommendation: RecommendationEntity | null = null;

    if (ability.can(Action.Manage, Subject.Recommendation)) {
      recommendation = await this.recommendationRepository.findById(id);
    } else if (ability.can(Action.Read, Subject.Recommendation)) {
      recommendation = await this.recommendationRepository.findByIdAndStoreId(id, authUser.storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access categories');
    }

    if (!recommendation) throw new NotFoundException('Recommendation not found');

    return recommendation;
  }
}
