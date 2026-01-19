import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { DeleteStoreUseCase } from '@/modules/store/application/use-cases/delete-store.use-case';
import { GetStoreByIdUseCase } from '@/modules/store/application/use-cases/get-store-by-id.use-case';

import { Action } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteStoreDash {
  constructor(
    private deleteStoreUseCase: DeleteStoreUseCase,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
  ) {}

  async execute(id: string, user: AuthUser, ability: AppAbility) {
    const store = await this.getStoreByIdUseCase.execute(id);

    if (ability.can(Action.Delete, store)) {
      return await this.deleteStoreUseCase.execute(id, user.userId);
    }

    throw new ForbiddenException("You're not allowed to delete store");
  }
}
