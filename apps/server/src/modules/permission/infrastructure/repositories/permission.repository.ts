import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../../domain/entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto } from '../../application/dtos/create-permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private repository: Repository<PermissionEntity>,
  ) {}

  create(permission: CreatePermissionDto) {
    return this.repository.create(permission);
  }

  async bulkSave(permissions: PermissionEntity[]) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(PermissionEntity)
      .values(permissions)
      .returning(['id'])
      .execute();
  }
}
