import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { GetCategoryListUseCase } from '@/modules/category/application/use-cases/get-category-list.use-case';
import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetCategoryListDash {
  constructor(private getCategoryList: GetCategoryListUseCase) {}

  async execute(pagination: PaginationDto, user: AuthUser, ability: AppAbility) {
    if (ability.can(Action.Manage, Subject.Category)) {
      const [categories, count] = await this.getCategoryList.execute(pagination);
      return this.generateData(categories, count, pagination);
    }

    if (ability.can(Action.Read, Subject.Category)) {
      const [categories, count] = await this.getCategoryList.execute(pagination, user.userId);
      return this.generateData(categories, count, pagination);
    }

    throw new ForbiddenException("You're not allowed to read categories");
  }

  private generateData(categories: CategoryEntity[], totalItems: number, pagination: PaginationDto) {
    return {
      categories,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems,
        totalPages: Math.ceil(totalItems / pagination.limit),
      },
    };
  }
}
