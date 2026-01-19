import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { GetProductListUseCase } from '@/modules/product/application/use-cases/get-product-list.use-case';
import { ProductEntity } from '@/modules/product/domain/entities/product.entity';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetProductListDash {
  constructor(private getProductList: GetProductListUseCase) {}

  async execute(pagination: PaginationDto, user: AuthUser, ability: AppAbility) {
    if (ability.can(Action.Manage, Subject.Product)) {
      const [products, count] = await this.getProductList.execute(pagination);
      return this.generateData(products, count, pagination);
    }

    if (ability.can(Action.Read, Subject.Product)) {
      const [products, count] = await this.getProductList.execute(pagination, user.userId);
      return this.generateData(products, count, pagination);
    }

    throw new ForbiddenException("You're not allowed to read products");
  }

  private generateData(products: ProductEntity[], totalItems: number, pagination: PaginationDto) {
    return {
      products,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems,
        totalPages: Math.ceil(totalItems / pagination.limit),
      },
    };
  }
}
