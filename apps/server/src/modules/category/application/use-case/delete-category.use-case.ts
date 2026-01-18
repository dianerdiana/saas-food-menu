import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    const category = await this.categoryRepository.findById(id);

    if (!category) throw new NotFoundException('Category is not found');

    if (!ability.can(Action.Delete, category)) {
      throw new ForbiddenException('You are not allowed to delete this category');
    }

    category.deletedBy = authUser.userId;
    await this.categoryRepository.save(category);

    const updateResult = await this.categoryRepository.deleteById(category.id);

    return updateResult.affected && true;
  }
}
