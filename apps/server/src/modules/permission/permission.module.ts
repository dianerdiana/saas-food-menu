import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';

import { PermissionEntity } from './domain/entities/permission.entity';
import { BulkCreatePermissionUseCase } from './application/use-cases/bulk-create-permission.use-case';
import { PermissionRepository } from './infrastructure/repositories/permission.repository';
import { PermissionController } from './interface/controllers/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity]), AuthorizationModule],
  controllers: [PermissionController],
  providers: [PermissionRepository, BulkCreatePermissionUseCase],
})
export class PermissionModule {}
