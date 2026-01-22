import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from './infrastructure/repositories/role.repository';
import { AuthorizationModule } from '../authorization/authorization.module';

import { RoleEntity } from './domain/entities/role.entity';
import { BulkCreateRoleUseCase } from './application/use-cases/bulk-create-role.use-case';
import { GetRoleByNameUseCase } from './application/use-cases/get-role-by-name.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), AuthorizationModule],
  providers: [RoleRepository, BulkCreateRoleUseCase, GetRoleByNameUseCase],
  exports: [BulkCreateRoleUseCase, GetRoleByNameUseCase],
})
export class RoleModule {}
