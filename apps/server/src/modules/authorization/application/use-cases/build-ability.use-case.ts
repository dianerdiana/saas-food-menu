import { Injectable } from '@nestjs/common';

import { GetUserByIdWithPermissions } from '@/modules/user/application/use-cases/get-user-by-id-with-permissions.use-case';

import { AppAbility, CaslAbilityFactory } from '../../infrastructure/factories/casl-ability.factory';

import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class BuildAbilityUseCase {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private getUserByIdWithPermissions: GetUserByIdWithPermissions,
  ) {}

  async execute(authUser: AuthUser): Promise<AppAbility | null> {
    const user = await this.getUserByIdWithPermissions.execute(authUser.userId);

    if (!user) return null;

    const permissions = user.userRoles.flatMap((ur) => ur.role.rolePermissions.map((rp) => rp.permission));
    const ability = this.caslAbilityFactory.createForUser(user, permissions, authUser.storeId);

    return ability;
  }
}
