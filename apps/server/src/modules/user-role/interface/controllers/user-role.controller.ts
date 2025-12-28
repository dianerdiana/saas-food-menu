import { Body, Controller, Post } from '@nestjs/common';
import { BulkCreateUserRoleUseCase } from '../../application/use-cases/bulk-create-user-role.use-case';
import { CreateUserRoleDto } from '../../application/dtos/create-user-role.dto';

@Controller('user-roles')
export class UserRoleController {
  constructor(private bulkCreateUserRoleUseCase: BulkCreateUserRoleUseCase) {}

  @Post('bulk')
  async bulkCreate(@Body() createUserRoleDtos: CreateUserRoleDto[]) {
    return this.bulkCreateUserRoleUseCase.execute(createUserRoleDtos);
  }
}
