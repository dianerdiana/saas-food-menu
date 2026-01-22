import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleRepository } from './infrastructure/repositories/user-role.repository';
import { UserRoleEntity } from './domain/entities/user-role.entity';

import { BulkCreateUserRoleUseCase } from './application/use-cases/bulk-create-user-role.use-case';
import { AssignUserRoleService } from './application/services/assign-user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [UserRoleRepository, BulkCreateUserRoleUseCase, AssignUserRoleService],
  exports: [BulkCreateUserRoleUseCase, AssignUserRoleService],
})
export class UserRoleModule {}
