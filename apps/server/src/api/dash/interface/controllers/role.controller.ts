import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BulkCreateRoleUseCase } from '@/modules/role/application/use-cases/bulk-create-role.use-case';
import { CreateRoleDto } from '@/modules/role/application/dtos/create-role.dto';

import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';

import { Action, Subject } from '@/shared/enums/access-control.enum';

@UseGuards(PoliciesGuard)
@Controller('dash/roles')
export class DashRoleController {
  constructor(private bulkCreateRoleUseCase: BulkCreateRoleUseCase) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, Subject.Role))
  @Post('bulk')
  async bulkCreate(@Body() createRoleDtos: CreateRoleDto[]) {
    return this.bulkCreateRoleUseCase.execute(createRoleDtos);
  }
}
