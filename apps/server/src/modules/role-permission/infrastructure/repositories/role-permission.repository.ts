import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RolePermissionEntity } from '../../domain/entities/role-permission.entity';
import { CreateRolePermissionDto } from '../../application/dtos/create-role-permission.dto';

@Injectable()
export class RolePermissionRepository {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private repository: Repository<RolePermissionEntity>,
  ) {}

  create(permission: CreateRolePermissionDto) {
    return this.repository.create(permission);
  }

  async bulkSave(permissions: RolePermissionEntity[]) {
    return await this.repository.createQueryBuilder().insert().into(RolePermissionEntity).values(permissions).execute();
  }
}
