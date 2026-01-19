import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { UpdateStoreDto } from '@/modules/store/application/dtos/update-store.dto';
import { GetStoreByIdUseCase } from '@/modules/store/application/use-case/get-store-by-id.use-case';
import { UpdateStoreUseCase } from '@/modules/store/application/use-case/update-store.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateStoreLms {
  constructor(
    private getStoreByIdUseCase: GetStoreByIdUseCase,
    private updateStoreUseCase: UpdateStoreUseCase,
  ) {}

  async execute(id: string, dto: UpdateStoreDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const store = await this.getStoreByIdUseCase.execute(id);
    const ownerId = ability.can(Action.Manage, Subject.Store) && dto.userId ? dto.userId : user.userId;

    if (ability.can(Action.Update, store)) {
      return this.updateStoreUseCase.execute({ ...dto, userId: ownerId }, user.userId, id);
    }

    throw new ForbiddenException("You're not allowed to update store");
  }
}
