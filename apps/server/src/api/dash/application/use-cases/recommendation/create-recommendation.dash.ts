import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { CreateRecommendationDto } from '@/modules/recommendation/application/dtos/create-recommendation.dto';
import { CreateRecommendationUseCase } from '@/modules/recommendation/application/use-cases/create-recommendation.use-case';
import { GetProductByIdsUseCase } from '@/modules/product/application/use-cases/get-product-by-ids.use-case';
import { AssignProductRecommendationService } from '@/modules/product-recommendation/application/services/assign-product-recommendation.service';

import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateRecommendationDash {
  constructor(
    private createRecommendationUseCase: CreateRecommendationUseCase,
    private getProductByIdsUseCase: GetProductByIdsUseCase,
    private assignProductRecommendationService: AssignProductRecommendationService,
  ) {}

  async execute(dto: CreateRecommendationDto, user: AuthUser, ability: AppAbility) {
    const { productIds, storeId } = dto;

    const canManageRecommendation = ability.can(Action.Manage, Subject.Recommendation);
    const recommendationStoreId = canManageRecommendation && storeId ? storeId : user.storeId;
    const maxRecommendations = canManageRecommendation ? null : 100;

    const recommendation = this.createRecommendationUseCase.create(
      { ...dto, storeId: recommendationStoreId },
      user.userId,
    );

    if (ability.can(Action.Create, recommendation)) {
      const newRecommendation = await this.createRecommendationUseCase.save(recommendation, maxRecommendations);

      if (productIds && productIds.length) {
        const products = await this.getProductByIdsUseCase.execute(productIds);

        if (products.length !== productIds.length) throw new BadRequestException('Bad request create recommendation');

        await this.assignProductRecommendationService.assign(newRecommendation.id, productIds);
      }

      return newRecommendation;
    }

    throw new ForbiddenException("You're not allowed to create recommendation");
  }
}
