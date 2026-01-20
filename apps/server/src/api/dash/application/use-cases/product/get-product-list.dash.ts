import { ForbiddenException, Injectable } from '@nestjs/common';

import { ProductEntity } from '@/modules/product/domain/entities/product.entity';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { GetProductListUseCase } from '@/modules/product/application/use-cases/get-product-list.use-case';
import { GetStoreByIdsUseCase } from '@/modules/store/application/use-cases/get-store-by-ids.use-case';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetProductListDash {
  constructor(
    private getProductList: GetProductListUseCase,
    private getStoreByIds: GetStoreByIdsUseCase,
  ) {}

  async execute(pagination: PaginationDto, user: AuthUser, ability: AppAbility) {
    if (ability.can(Action.Manage, Subject.Product)) {
      const [products, count] = await this.getProductList.execute(pagination);
      return await this.generateData(products, count, pagination);
    }

    if (ability.can(Action.Read, Subject.Product)) {
      const [products, count] = await this.getProductList.execute(pagination, user.userId);
      return await this.generateData(products, count, pagination);
    }

    throw new ForbiddenException("You're not allowed to read products");
  }

  private async generateData(products: ProductEntity[], totalItems: number, pagination: PaginationDto) {
    const storeIds = products.map((category) => category.storeId);
    const uniqueStoreIds = [...new Set(storeIds)];
    const stores = await this.getStoreByIds.execute(uniqueStoreIds);

    const storeMap = new Map(stores.map((store) => [store.id, store]));

    return {
      products: products.map((product) => ({
        ...product,
        store: storeMap.get(product.storeId),
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
