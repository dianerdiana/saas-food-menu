import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../../infrastructure/repositories/user-role.repository';
import { CreateUserRoleDto } from '../dtos/create-user-role.dto';

@Injectable()
export class BulkCreateUserRoleUseCase {
  constructor(private userRoleRepository: UserRoleRepository) {}

  async execute(createRolePermissionsDto: CreateUserRoleDto[]) {
    const userRoles = createRolePermissionsDto.map((userRole) => this.userRoleRepository.create(userRole));
    return await this.userRoleRepository.bulkSave(userRoles);
  }
}
