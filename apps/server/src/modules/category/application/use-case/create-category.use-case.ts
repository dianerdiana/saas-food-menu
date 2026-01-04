import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { CATEGORY_STATUS } from '@/shared/constants/category-status.constant';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto & ImageOptionalDto, authUser: AuthUser, ability: AppAbility) {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      storeId: authUser.storeId,
      createdBy: authUser.userId,
      status: CATEGORY_STATUS.active,
    });

    if (!ability.can(Action.Create, category)) {
      throw new ForbiddenException('You are not allowed to create category');
    }

    await this.categoryRepository.save(category);

    return category;
  }
}
