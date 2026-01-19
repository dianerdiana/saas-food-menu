import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { CreateCategoryDto } from '@/modules/category/application/dtos/create-category.dto';
import { CreateCategoryUseCase } from '@/modules/category/application/use-cases/create-category.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateCategoryDash {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async execute(dto: CreateCategoryDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const canManageCategory = ability.can(Action.Manage, Subject.Category);
    const maxCategorys = canManageCategory ? null : 1;

    const category = this.createCategoryUseCase.create(dto, user.userId);

    if (ability.can(Action.Create, category)) {
      return await this.createCategoryUseCase.save(category, maxCategorys);
    }

    throw new ForbiddenException("You're not allowed to create category");
  }
}
