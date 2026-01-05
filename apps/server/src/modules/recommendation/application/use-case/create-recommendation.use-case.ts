import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';
import { CreateRecommendationDto } from '../dtos/create-recommendation.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { RECOMMENDATION_STATUS } from '@/shared/constants/recommendation.constant';

const MAX_RECOMMENDATIONS = 2;

@Injectable()
export class CreateRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(createRecommendationDto: CreateRecommendationDto, authUser: AuthUser, ability: AppAbility) {
    const { storeId, userId } = authUser;

    const ownedCategoriesCount = await this.recommendationRepository.countAllOwned(storeId);
    const maxCategories = ability.can(Action.Manage, Subject.Recommendation) ? null : MAX_RECOMMENDATIONS;

    if (maxCategories !== null && ownedCategoriesCount >= maxCategories) {
      throw new BadRequestException('You already reached recommendation limit');
    }

    const recommendation = this.recommendationRepository.create({
      ...createRecommendationDto,
      storeId,
      createdBy: userId,
      status: RECOMMENDATION_STATUS.active,
    });

    if (!ability.can(Action.Create, recommendation)) {
      throw new ForbiddenException('You are not allowed to create recommendation');
    }

    await this.recommendationRepository.save(recommendation);

    return recommendation;
  }
}
