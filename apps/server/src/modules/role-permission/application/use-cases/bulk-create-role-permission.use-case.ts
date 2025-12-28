import { Injectable } from '@nestjs/common';
import { RolePermissionRepository } from '../../infrastructure/repositories/role-permission.repository';
import { CreateRolePermissionDto } from '../dtos/create-role-permission.dto';

@Injectable()
export class BulkCreateRolePermissionUseCase {
  constructor(private permissionRepository: RolePermissionRepository) {}

  async execute(createRolePermissionsDto: CreateRolePermissionDto[]) {
    const permissions = createRolePermissionsDto.map((permission) => this.permissionRepository.create(permission));
    return await this.permissionRepository.bulkSave(permissions);
  }
}
