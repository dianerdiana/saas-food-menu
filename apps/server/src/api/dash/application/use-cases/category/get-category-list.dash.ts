import { ForbiddenException, Injectable } from '@nestjs/common';

import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { GetCategoryListUseCase } from '@/modules/category/application/use-cases/get-category-list.use-case';
import { GetStoreByIdsUseCase } from '@/modules/store/application/use-cases/get-store-by-ids.use-case';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetCategoryListDash {
  constructor(
    private getCategoryList: GetCategoryListUseCase,
    private getStoreByIds: GetStoreByIdsUseCase,
  ) {}

  async execute(pagination: PaginationDto, user: AuthUser, ability: AppAbility) {
    if (ability.can(Action.Manage, Subject.Category)) {
      const [categories, count] = await this.getCategoryList.execute(pagination);
      return await this.generateData(categories, count, pagination);
    }

    if (ability.can(Action.Read, Subject.Category)) {
      const [categories, count] = await this.getCategoryList.execute(pagination, user.storeId);
      return await this.generateData(categories, count, pagination);
    }

    throw new ForbiddenException("You're not allowed to read categories");
  }

  private async generateData(categories: CategoryEntity[], totalItems: number, pagination: PaginationDto) {
    const storeMap = new Map();

    if (categories.length) {
      const stores = await this.getStoreByIds.execute([...new Set(categories.map((category) => category.storeId))]);

      for (const store of stores) {
        storeMap.set(store.id, store);
      }
    }

    return {
      categories: categories.map((category) => ({
        ...category,
        store: storeMap.get(category.storeId),
      })),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems,
        totalPages: Math.ceil(totalItems / pagination.limit),
      },
    };
  }
}
