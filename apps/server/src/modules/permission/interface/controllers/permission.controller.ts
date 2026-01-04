import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BulkCreatePermissionUseCase } from '../../application/use-cases/bulk-create-permission.use-case';
import { CreatePermissionDto } from '../../application/dtos/create-permission.dto';

import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';

import { Action } from '@/shared/enums/action.enum';
import { Subject } from '@/shared/enums/subject.enum';

@Controller('permissions')
export class PermissionController {
  constructor(private bulkCreatePermissionUseCase: BulkCreatePermissionUseCase) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.Permission))
  @Post('bulk')
  async bulkCreate(@Body() createPermissionDtos: CreatePermissionDto[]) {
    return this.bulkCreatePermissionUseCase.execute(createPermissionDtos);
  }
}
