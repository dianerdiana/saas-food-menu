import { Body, Controller, Post } from '@nestjs/common';
import { BulkCreateRolePermissionUseCase } from '../../application/use-cases/bulk-create-role-permission.use-case';
import { CreateRolePermissionDto } from '../../application/dtos/create-role-permission.dto';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(private bulkCreateRolePermissionUseCase: BulkCreateRolePermissionUseCase) {}

  @Post('bulk')
  async bulkCreate(@Body() createRolePermissionDtos: CreateRolePermissionDto[]) {
    return this.bulkCreateRolePermissionUseCase.execute(createRolePermissionDtos);
  }
}
