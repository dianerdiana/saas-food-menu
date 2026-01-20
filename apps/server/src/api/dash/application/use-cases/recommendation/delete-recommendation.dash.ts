import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { DeleteRecommendationUseCase } from '@/modules/recommendation/application/use-cases/delete-recommendation.use-case';
import { GetRecommendationByIdUseCase } from '@/modules/recommendation/application/use-cases/get-recommendation-by-id.use-case';
import { DeleteProductRecommendationService } from '@/modules/product-recommendation/application/services/delete-product-recommendation.service';

import { Action } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteRecommendationDash {
  constructor(
    private deleteRecommendationUseCase: DeleteRecommendationUseCase,
    private getRecommendationByIdUseCase: GetRecommendationByIdUseCase,
    private deleteProductRecommendationService: DeleteProductRecommendationService,
  ) {}

  async execute(id: string, user: AuthUser, ability: AppAbility) {
    const recommendation = await this.getRecommendationByIdUseCase.execute(id);

    if (ability.can(Action.Delete, recommendation)) {
      const result = await this.deleteRecommendationUseCase.execute(id, user.userId);
      await this.deleteProductRecommendationService.execute(id);

      return result;
    }

    throw new ForbiddenException("You're not allowed to delete product");
  }
}
