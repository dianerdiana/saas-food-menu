import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';

import { RolePermissionEntity } from './domain/entities/role-permission.entity';
import { BulkCreateRolePermissionUseCase } from './application/use-cases/bulk-create-role-permission.use-case';
import { RolePermissionRepository } from './infrastructure/repositories/role-permission.repository';
import { RolePermissionController } from './interface/controllers/role-permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity]), AuthorizationModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionRepository, BulkCreateRolePermissionUseCase],
})
export class RolePermissionModule {}
