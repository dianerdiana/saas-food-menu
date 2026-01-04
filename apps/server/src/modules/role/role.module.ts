import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';

import { RoleEntity } from './domain/entities/role.entity';
import { BulkCreateRoleUseCase } from './application/use-cases/bulk-create-role.use-case';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { RoleController } from './interface/controllers/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), AuthorizationModule],
  controllers: [RoleController],
  providers: [RoleRepository, BulkCreateRoleUseCase],
})
export class RoleModule {}
