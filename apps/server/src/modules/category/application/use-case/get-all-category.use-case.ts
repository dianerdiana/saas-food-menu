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

    let data: CategoryEntity[] = [];
    let count: number = 0;

    if (ability.can(Action.Manage, Subject.All)) {
      [data, count] = await this.categoryRepository.findAll(paginationDto);
      console.log(data);
    } else if (ability.can(Action.Read, Subject.Category)) {
      [data, count] = await this.categoryRepository.findAllByStoreId(paginationDto, authUser.storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access categories');
    }

    const totalPages = Math.ceil(count / limit);

    return {
      categories: data,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
