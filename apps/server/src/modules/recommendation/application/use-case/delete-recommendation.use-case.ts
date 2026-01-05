import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class DeleteRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    const recommendation = await this.recommendationRepository.findById(id);

    if (!recommendation) throw new NotFoundException('Recommendation is not found');

    if (!ability.can(Action.Delete, recommendation)) {
      throw new ForbiddenException('You are not allowed to delete this recommendation');
    }

    recommendation.deletedBy = authUser.userId;
    await this.recommendationRepository.save(recommendation);

    const updateResult = await this.recommendationRepository.deleteById(recommendation.id);

    return updateResult.affected && true;
  }
}
