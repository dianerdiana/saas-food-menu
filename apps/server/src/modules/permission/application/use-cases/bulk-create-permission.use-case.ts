import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../../infrastructure/repositories/permission.repository';
import { CreatePermissionDto } from '../dtos/create-permission.dto';

@Injectable()
export class BulkCreatePermissionUseCase {
  constructor(private permissionRepository: PermissionRepository) {}

  async execute(createPermissionsDto: CreatePermissionDto[]) {
    const permissions = createPermissionsDto.map((permission) => this.permissionRepository.create(permission));
    return await this.permissionRepository.bulkSave(permissions);
  }
}
