import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';

import { UserRoleEntity } from './domain/entities/user-role.entity';
import { BulkCreateUserRoleUseCase } from './application/use-cases/bulk-create-user-role.use-case';
import { UserRoleRepository } from './infrastructure/repositories/user-role.repository';
import { UserRoleController } from './interface/controllers/user-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity]), AuthorizationModule],
  controllers: [UserRoleController],
  providers: [UserRoleRepository, BulkCreateUserRoleUseCase],
})
export class UserRoleModule {}
