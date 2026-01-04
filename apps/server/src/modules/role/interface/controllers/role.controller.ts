import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BulkCreateRoleUseCase } from '../../application/use-cases/bulk-create-role.use-case';
import { CreateRoleDto } from '../../application/dtos/create-role.dto';

import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';

import { Action } from '@/shared/enums/action.enum';
import { Subject } from '@/shared/enums/subject.enum';

@Controller('roles')
export class RoleController {
  constructor(private bulkCreateRoleUseCase: BulkCreateRoleUseCase) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.Role))
  @Post('bulk')
  async bulkCreate(@Body() createRoleDtos: CreateRoleDto[]) {
    return this.bulkCreateRoleUseCase.execute(createRoleDtos);
  }
}
