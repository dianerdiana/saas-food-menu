import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { BuildAbilityUseCase } from '@/modules/authorization/application/use-cases/build-ability.use-case';
import { PolicyHandler } from '../decorator/check-policies.decorator';
import { AppAbility } from '../factories/casl-ability.factory';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '@/shared/constants/access-control.constant';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private buildAbilityUseCase: BuildAbilityUseCase,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const ability = await this.buildAbilityUseCase.execute(userId);

    if (!ability) return false;

    request.ability = ability;

    const isAllowed = policies.every((policy) => policy(ability));

    if (!isAllowed) {
      throw new ForbiddenException('Access denied by policy');
    }

    return true;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    return handler(ability);
  }
}
