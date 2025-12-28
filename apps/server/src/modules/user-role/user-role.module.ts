import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleController } from './interface/controllers/user-role.controller';
import { UserRoleRepository } from './infrastructure/repositories/user-role.repository';

import { BulkCreateUserRoleUseCase } from './application/use-cases/bulk-create-user-role.use-case';

import { UserRoleEntity } from './domain/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  controllers: [UserRoleController],
  providers: [UserRoleRepository, BulkCreateUserRoleUseCase],
})
export class UserRoleModule {}
