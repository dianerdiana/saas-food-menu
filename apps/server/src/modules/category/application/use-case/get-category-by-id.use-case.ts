import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    let category: CategoryEntity | null = null;

    if (ability.can(Action.Manage, Subject.Category)) {
      category = await this.categoryRepository.findById(id);
    } else if (ability.can(Action.Read, Subject.Category)) {
      category = await this.categoryRepository.findByIdAndStoreId(id, authUser.storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access categories');
    }

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
