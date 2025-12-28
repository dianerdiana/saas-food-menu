import { Body, Controller, Post } from '@nestjs/common';
import { BulkCreateRoleUseCase } from '../../application/use-cases/bulk-create-role.use-case';
import { CreateRoleDto } from '../../application/dtos/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private bulkCreateRoleUseCase: BulkCreateRoleUseCase) {}

  @Post('bulk')
  async bulkCreate(@Body() createRoleDtos: CreateRoleDto[]) {
    return this.bulkCreateRoleUseCase.execute(createRoleDtos);
  }
}
