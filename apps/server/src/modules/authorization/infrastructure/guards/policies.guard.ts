import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { BuildAbilityUseCase } from '@/modules/authorization/application/use-cases/build-ability.use-case';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private buildAbilityUseCase: BuildAbilityUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const ability = await this.buildAbilityUseCase.execute(userId);

    if (!ability) return false;

    request.ability = ability;

    return true;
  }
}
