import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetAllProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(paginationDto: PaginationDto, authUser: AuthUser, ability: AppAbility) {
    const { limit, page } = paginationDto;

    let data: ProductEntity[] = [];
    let count: number = 0;

    if (ability.can(Action.Manage, Subject.All)) {
      [data, count] = await this.productRepository.findAll(paginationDto);
    } else if (ability.can(Action.Read, Subject.Product)) {
      [data, count] = await this.productRepository.findAllByStoreId(paginationDto, authUser.storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access products');
    }

    const totalPages = Math.ceil(count / limit);

    return {
      products: data,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
