import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { GetStoreListUseCase } from '@/modules/store/application/use-case/get-store-list.use-case';
import { StoreEntity } from '@/modules/store/domain/entities/store.entity';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GetStoreListLms {
  constructor(private getStoreList: GetStoreListUseCase) {}

  async execute(pagination: PaginationDto, user: AuthUser, ability: AppAbility) {
    if (ability.can(Action.Manage, Subject.Store)) {
      const [stores, count] = await this.getStoreList.execute(pagination);
      return this.generateData(stores, count, pagination);
    }

    if (ability.can(Action.Read, Subject.Store)) {
      const [stores, count] = await this.getStoreList.execute(pagination, user.userId);
      return this.generateData(stores, count, pagination);
    }

    throw new ForbiddenException("You're not allowed to read stores");
  }

  private generateData(stores: StoreEntity[], totalItems: number, pagination: PaginationDto) {
    return {
      stores,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems,
        totalPages: Math.ceil(totalItems / pagination.limit),
      },
    };
  }
}
