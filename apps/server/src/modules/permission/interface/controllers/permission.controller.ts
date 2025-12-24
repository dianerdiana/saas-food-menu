import { Body, Controller, Post } from '@nestjs/common';
import { BulkCreatePermissionUseCase } from '../../application/use-cases/bulk-create-permission.use-case';
import { CreatePermissionDto } from '../../application/dtos/create-permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private bulkCreatePermissionUseCase: BulkCreatePermissionUseCase) {}

  @Post('bulk')
  async bulkCreate(@Body() createPermissionDtos: CreatePermissionDto[]) {
    return this.bulkCreatePermissionUseCase.execute(createPermissionDtos);
  }
}
