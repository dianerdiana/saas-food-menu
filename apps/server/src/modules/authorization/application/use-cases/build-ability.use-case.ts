import { Injectable } from '@nestjs/common';

import { GetUserByIdWithPermissions } from '@/modules/user/application/use-cases/get-user-by-id-with-permissions.use-case';

import { CaslAbilityFactory } from '../../infrastructure/factories/casl-ability.factory';

@Injectable()
export class BuildAbilityUseCase {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private getUserByIdWithPermissions: GetUserByIdWithPermissions,
  ) {}

  async execute(userId: string) {
    const user = await this.getUserByIdWithPermissions.execute(userId);

    if (!user) return null;

    const permissions = user.userRoles.flatMap((ur) => ur.role.rolePermissions.map((rp) => rp.permission));
    const ability = this.caslAbilityFactory.createForUser(user, permissions);

    return ability;
  }
}
