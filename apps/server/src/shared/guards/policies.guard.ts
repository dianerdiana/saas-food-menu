import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../factories/casl-ability.factory';
import { RequiredRule } from '../types/access-control.type';
import { CHECK_POLICIES_KEY } from '../constants/access-control.constant';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const userPermissions = user.roles.flatMap((role) => role.rolePermissions);
    const ability = this.caslAbilityFactory.createForUser(user, userPermissions);

    request.ability = ability;

    const rules = this.reflector.get<RequiredRule[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    if (rules.length === 0) return true;

    return rules.every((rule) => ability.can(rule.action, rule.subject));
  }
}
