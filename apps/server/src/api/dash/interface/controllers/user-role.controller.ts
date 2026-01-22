import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BulkCreateUserRoleUseCase } from '@/modules/user-role/application/use-cases/bulk-create-user-role.use-case';
import { CreateUserRoleDto } from '@/modules/user-role/application/dtos/create-user-role.dto';

import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';

import { Action, Subject } from '@/shared/enums/access-control.enum';

@UseGuards(PoliciesGuard)
@Controller('dash/user-roles')
export class DashUserRoleController {
  constructor(private bulkCreateUserRoleUseCase: BulkCreateUserRoleUseCase) {}

  @CheckPolicies((ability) => ability.can(Action.Manage, Subject.UserRole))
  @Post('bulk')
  async bulkCreate(@Body() createUserRoleDtos: CreateUserRoleDto[]) {
    return this.bulkCreateUserRoleUseCase.execute(createUserRoleDtos);
  }
}
