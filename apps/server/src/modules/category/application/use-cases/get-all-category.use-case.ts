import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class GetAllCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(paginationDto: PaginationDto, authUser: AuthUser, ability: AppAbility) {
    const { limit, page } = paginationDto;
    const { storeId } = authUser;

    let categories: CategoryEntity[] = [];
    let totalItems: number = 0;

    if (ability.can(Action.Manage, Subject.All)) {
      [categories, totalItems] = await this.categoryRepository.findAll(paginationDto);
    } else if (ability.can(Action.Read, Subject.Category)) {
      [categories, totalItems] = await this.categoryRepository.findAllByStoreId(paginationDto, storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access categories');
    }

    const totalPages = Math.ceil(totalItems / limit);

    return {
      categories,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }
}
