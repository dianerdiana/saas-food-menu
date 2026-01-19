import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { DeleteCategoryUseCase } from '@/modules/category/application/use-cases/delete-category.use-case';
import { GetCategoryByIdUseCase } from '@/modules/category/application/use-cases/get-category-by-id.use-case';

import { Action } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteCategoryDash {
  constructor(
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
  ) {}

  async execute(id: string, user: AuthUser, ability: AppAbility) {
    const category = await this.getCategoryByIdUseCase.execute(id);

    if (ability.can(Action.Delete, category)) {
      return await this.deleteCategoryUseCase.execute(id, user.userId);
    }

    throw new ForbiddenException("You're not allowed to delete category");
  }
}
