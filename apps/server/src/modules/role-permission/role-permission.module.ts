import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermissionController } from './interface/controllers/role-permission.controller';
import { RolePermissionRepository } from './infrastructure/repositories/role-permission.repository';

import { BulkCreateRolePermissionUseCase } from './application/use-cases/bulk-create-role-permission.use-case';

import { RolePermissionEntity } from './domain/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity])],
  controllers: [RolePermissionController],
  providers: [RolePermissionRepository, BulkCreateRolePermissionUseCase],
})
export class RolePermissionModule {}
