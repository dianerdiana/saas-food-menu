import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { BuildAbilityUseCase } from '@/modules/authorization/application/use-cases/build-ability.use-case';

import { PolicyHandler } from '../decorator/check-policies.decorator';
import { AppAbility } from '../factories/casl-ability.factory';

import { CHECK_POLICIES_KEY } from '@/shared/constants/access-control.constant';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private buildAbilityUseCase: BuildAbilityUseCase,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    const request = context.switchToHttp().getRequest();
    const authUser = request.user as AuthUser;
    const ability = await this.buildAbilityUseCase.execute(authUser);

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
