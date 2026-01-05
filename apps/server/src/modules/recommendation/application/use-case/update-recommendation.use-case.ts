import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';
import { UpdateRecommendationDto } from '../dtos/update-recommendation.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class UpdateRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(updateRecommendationDto: UpdateRecommendationDto, id: string, authUser: AuthUser, ability: AppAbility) {
    const { name, displayMode } = updateRecommendationDto;

    const recommendation = await this.recommendationRepository.findById(id);
    if (!recommendation) throw new NotFoundException('Recommendation is not found');

    if (!ability.can(Action.Update, recommendation)) {
      throw new ForbiddenException('You are not allowed to update this recommendation');
    }

    recommendation.name = name;
    recommendation.displayMode = displayMode;
    recommendation.updatedBy = authUser.userId;

    await this.recommendationRepository.save(recommendation);
    return recommendation;
  }
}
