import { Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { AuthUser } from '@/shared/types/auth-user.type';
import { ActionControl, SubjectControl } from '@/shared/types/access-control.type';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { StoreModel } from '../../domain/models/store.model';
import { StoreEntity } from '../../domain/entities/store.entity';

@Injectable()
export class GetAllStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(paginationDto: PaginationDto, authUser: AuthUser, ability: AppAbility) {
    const { limit, page } = paginationDto;

    let data: StoreEntity[] = [];
    let count: number = 0;

    if (ability.can(ActionControl.Manage, SubjectControl.Store)) {
      [data, count] = await this.storeRepository.findAll(paginationDto);
    }

    if (ability.can(ActionControl.Read, SubjectControl.Store)) {
      [data, count] = await this.storeRepository.findAllOwned(paginationDto, authUser.userId);
    }

    const stores = data.map((store) => new StoreModel(store));
    const totalPages = Math.ceil(count / limit);

    return {
      stores,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
