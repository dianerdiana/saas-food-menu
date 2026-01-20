import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { UpdateCategoryDto } from '@/modules/category/application/dtos/update-category.dto';
import { GetCategoryByIdUseCase } from '@/modules/category/application/use-cases/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from '@/modules/category/application/use-cases/update-category.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateCategoryDash {
  constructor(
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  async execute(id: string, dto: UpdateCategoryDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const canManageCategory = ability.can(Action.Manage, Subject.Category);
    const categoryStoreId = canManageCategory && dto.storeId ? dto.storeId : user.storeId;

    const category = await this.getCategoryByIdUseCase.execute(id);

    if (ability.can(Action.Update, category)) {
      return this.updateCategoryUseCase.execute({ ...dto, storeId: categoryStoreId }, user.userId, id);
    }

    throw new ForbiddenException("You're not allowed to update category");
  }
}
