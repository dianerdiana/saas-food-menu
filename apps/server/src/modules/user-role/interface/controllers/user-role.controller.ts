import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BulkCreateUserRoleUseCase } from '../../application/use-cases/bulk-create-user-role.use-case';
import { CreateUserRoleDto } from '../../application/dtos/create-user-role.dto';

import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';

import { Action } from '@/shared/enums/action.enum';
import { Subject } from '@/shared/enums/subject.enum';

@Controller('user-roles')
export class UserRoleController {
  constructor(private bulkCreateUserRoleUseCase: BulkCreateUserRoleUseCase) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.UserRole))
  @Post('bulk')
  async bulkCreate(@Body() createUserRoleDtos: CreateUserRoleDto[]) {
    return this.bulkCreateUserRoleUseCase.execute(createUserRoleDtos);
  }
}
