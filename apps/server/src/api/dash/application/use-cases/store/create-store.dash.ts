import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { CreateStoreDto } from '@/modules/store/application/dtos/create-store.dto';
import { CreateStoreUseCase } from '@/modules/store/application/use-cases/create-store.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateStoreDash {
  constructor(private createStoreUseCase: CreateStoreUseCase) {}

  async execute(dto: CreateStoreDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const canManageStore = ability.can(Action.Manage, Subject.Store);
    const ownerId = canManageStore && dto.userId ? dto.userId : user.userId;
    const maxStores = canManageStore ? null : 1;

    const store = this.createStoreUseCase.create({ ...dto, userId: ownerId }, user.userId);

    if (ability.can(Action.Create, store)) {
      return await this.createStoreUseCase.save(store, maxStores);
    }

    throw new ForbiddenException("You're not allowed to create store");
  }
}
