import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/action.enum';
import { Subject } from '@/shared/enums/subject.enum';

@Injectable()
export class DeleteStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new NotFoundException('Store is not found');

    if (!ability.can(Action.Delete, store)) {
      throw new ForbiddenException('You are not allowed to delete this store');
    }

    store.deletedBy = authUser.userId;
    await this.storeRepository.save(store);

    const updateResult = await this.storeRepository.deleteById(store.id);

    return updateResult.affected && true;
  }
}
