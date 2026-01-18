import { ForbiddenException, Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { AuthUser } from '@/shared/types/auth-user.type';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { StoreEntity } from '../../domain/entities/store.entity';

@Injectable()
export class GetSelectStoreDataUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(paginationDto: PaginationDto, authUser: AuthUser, ability: AppAbility) {
    const { userId } = authUser;
    let store: StoreEntity[] | null = null;

    if (ability.can(Action.Manage, Subject.Store)) {
      store = await this.storeRepository.findAll(paginationDto);
    } else if (ability.can(Action.Read, Subject.Store)) {
      store = await this.storeRepository.findAllOwned(paginationDto, userId);
    } else {
      throw new ForbiddenException('You are not allowed to access stores');
    }

    return store;
  }
}
