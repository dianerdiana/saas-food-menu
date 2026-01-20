import { ForbiddenException, Injectable } from '@nestjs/common';

import { RecommendationEntity } from '@/modules/recommendation/domain/entities/recommendation.entity';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { GetRecommendationListUseCase } from '@/modules/recommendation/application/use-cases/get-recommendation-list.use-case';
import { GetStoreByIdsUseCase } from '@/modules/store/application/use-cases/get-store-by-ids.use-case';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetRecommendationListDash {
  constructor(
    private getRecommendationList: GetRecommendationListUseCase,
    private getStoreByIds: GetStoreByIdsUseCase,
  ) {}

  async execute(pagination: PaginationDto, user: AuthUser, ability: AppAbility) {
    if (ability.can(Action.Manage, Subject.Recommendation)) {
      const [recommendations, count] = await this.getRecommendationList.execute(pagination);
      return await this.generateData(recommendations, count, pagination);
    }

    if (ability.can(Action.Read, Subject.Recommendation)) {
      const [recommendations, count] = await this.getRecommendationList.execute(pagination, user.storeId);
      return await this.generateData(recommendations, count, pagination);
    }

    throw new ForbiddenException("You're not allowed to read recommendations");
  }

  private async generateData(recommendations: RecommendationEntity[], totalItems: number, pagination: PaginationDto) {
    const storeMap = new Map();

    if (recommendations.length) {
      const stores = await this.getStoreByIds.execute([
        ...new Set(recommendations.map((recommendation) => recommendation.storeId)),
      ]);

      for (const store of stores) {
        storeMap.set(store.id, store);
      }
    }

    return {
      recommendations: recommendations.map((recommendation) => ({
        ...recommendation,
        store: storeMap.get(recommendation.storeId),
      })),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems,
        totalPages: Math.ceil(totalItems / pagination.limit),
      },
    };
  }
}
