import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BulkCreateRolePermissionUseCase } from '../../application/use-cases/bulk-create-role-permission.use-case';
import { CreateRolePermissionDto } from '../../application/dtos/create-role-permission.dto';

import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';

import { Action, Subject } from '@/shared/enums/access-control.enum';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(private bulkCreateRolePermissionUseCase: BulkCreateRolePermissionUseCase) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.RolePermission))
  @Post('bulk')
  async bulkCreate(@Body() createRolePermissionDtos: CreateRolePermissionDto[]) {
    return this.bulkCreateRolePermissionUseCase.execute(createRolePermissionDtos);
  }
}
