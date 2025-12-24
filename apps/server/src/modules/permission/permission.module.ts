import { Module } from '@nestjs/common';
import { PermissionController } from './interface/controllers/permission.controller';
import { BulkCreatePermissionUseCase } from './application/use-cases/bulk-create-permission.use-case';
import { PermissionRepository } from './infrastructure/repositories/permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './domain/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
  providers: [PermissionRepository, BulkCreatePermissionUseCase],
})
export class PermissionModule {}
