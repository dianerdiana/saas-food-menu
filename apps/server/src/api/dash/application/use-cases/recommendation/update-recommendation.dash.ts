import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { UpdateRecommendationDto } from '@/modules/recommendation/application/dtos/update-recommendation.dto';

import { GetRecommendationByIdUseCase } from '@/modules/recommendation/application/use-cases/get-recommendation-by-id.use-case';
import { UpdateRecommendationUseCase } from '@/modules/recommendation/application/use-cases/update-recommendation.use-case';
import { GetProductByIdsUseCase } from '@/modules/product/application/use-cases/get-product-by-ids.use-case';

import { AssignProductRecommendationService } from '@/modules/product-recommendation/application/services/assign-product-recommendation.service';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateRecommendationDash {
  constructor(
    private getRecommendationByIdUseCase: GetRecommendationByIdUseCase,
    private updateRecommendationUseCase: UpdateRecommendationUseCase,
    private getProductByIdsUseCase: GetProductByIdsUseCase,
    private assignProductRecommendationService: AssignProductRecommendationService,
  ) {}

  async execute(id: string, dto: UpdateRecommendationDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const { productIds, storeId } = dto;

    const canManageRecommendation = ability.can(Action.Manage, Subject.Recommendation);
    const recommendationStoreId = canManageRecommendation && storeId ? storeId : user.storeId;
    const recommendation = await this.getRecommendationByIdUseCase.execute(id);

    if (ability.can(Action.Update, recommendation)) {
      if (productIds && productIds.length) {
        const products = await this.getProductByIdsUseCase.execute(productIds);

        if (products.length !== productIds.length) throw new BadRequestException('Bad request update recommendation');

        await this.assignProductRecommendationService.assign(recommendation.id, productIds);
      }

      return await this.updateRecommendationUseCase.execute(
        { ...dto, storeId: recommendationStoreId },
        id,
        user.userId,
      );
    }

    throw new ForbiddenException("You're not allowed to update recommendation");
  }
}
