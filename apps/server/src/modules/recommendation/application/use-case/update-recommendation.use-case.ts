import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { AssignProductRecommendationService } from '@/modules/product-recommendation/application/services/assign-product-recommendation.service';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';
import { UpdateRecommendationDto } from '../dtos/update-recommendation.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class UpdateRecommendationUseCase {
  constructor(
    private recommendationRepository: RecommendationRepository,
    private assignProductRecommendation: AssignProductRecommendationService,
  ) {}

  async execute(updateRecommendationDto: UpdateRecommendationDto, id: string, authUser: AuthUser, ability: AppAbility) {
    const { userId, storeId } = authUser;
    const { name, displayMode, productIds } = updateRecommendationDto;

    const recommendation = await this.recommendationRepository.findById(id);
    if (!recommendation) throw new NotFoundException('Recommendation is not found');

    if (!ability.can(Action.Update, recommendation)) {
      throw new ForbiddenException('You are not allowed to update this recommendation');
    }

    recommendation.name = name;
    recommendation.displayMode = displayMode;
    recommendation.updatedBy = userId;

    await this.recommendationRepository.save(recommendation);

    if (productIds && productIds.length) {
      await this.assignProductRecommendation.assign(recommendation.id, productIds);
    }

    return recommendation;
  }
}
