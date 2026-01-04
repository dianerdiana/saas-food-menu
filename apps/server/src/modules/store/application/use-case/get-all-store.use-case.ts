import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { StoreEntity } from '../../domain/entities/store.entity';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { AuthUser } from '@/shared/types/auth-user.type';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class GetAllStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(paginationDto: PaginationDto, authUser: AuthUser, ability: AppAbility) {
    const { limit, page } = paginationDto;

    let data: StoreEntity[] = [];
    let count: number = 0;

    if (ability.can(Action.Manage, Subject.All)) {
      [data, count] = await this.storeRepository.findAll(paginationDto);
    } else if (ability.can(Action.Read, Subject.Store)) {
      [data, count] = await this.storeRepository.findAllOwned(paginationDto, authUser.userId);
    } else {
      throw new ForbiddenException('You are not allowed to access stores');
    }

    const totalPages = Math.ceil(count / limit);

    return {
      stores: data,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
