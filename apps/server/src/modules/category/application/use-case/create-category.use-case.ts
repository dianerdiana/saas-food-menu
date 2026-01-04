import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { CATEGORY_STATUS } from '@/shared/constants/category-status.constant';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';

const MAX_CATEGORIES = 50;

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto & ImageOptionalDto, authUser: AuthUser, ability: AppAbility) {
    const { storeId, userId } = authUser;

    const existingStoreSlug = await this.categoryRepository.findBySlugAndStoreId(createCategoryDto.slug, storeId);
    if (existingStoreSlug) throw new BadRequestException('Categories slug is already exist');

    const ownedCategoriesCount = await this.categoryRepository.countAllOwned(userId);
    const maxCategories = ability.can(Action.Manage, Subject.Category) ? null : MAX_CATEGORIES;

    if (maxCategories !== null && ownedCategoriesCount >= maxCategories) {
      throw new BadRequestException('You already reached category limit');
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      storeId,
      createdBy: userId,
      status: CATEGORY_STATUS.active,
    });

    if (!ability.can(Action.Create, category)) {
      throw new ForbiddenException('You are not allowed to create category');
    }

    await this.categoryRepository.save(category);

    return category;
  }
}
