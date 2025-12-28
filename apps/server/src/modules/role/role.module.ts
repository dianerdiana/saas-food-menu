import { Module } from '@nestjs/common';
import { RoleController } from './interface/controllers/role.controller';
import { BulkCreateRoleUseCase } from './application/use-cases/bulk-create-role.use-case';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './domain/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleRepository, BulkCreateRoleUseCase],
})
export class RoleModule {}
