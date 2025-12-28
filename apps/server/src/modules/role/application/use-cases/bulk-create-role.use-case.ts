import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../infrastructure/repositories/role.repository';
import { CreateRoleDto } from '../dtos/create-role.dto';

@Injectable()
export class BulkCreateRoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async execute(createRolesDto: CreateRoleDto[]) {
    const roles = createRolesDto.map((role) => this.roleRepository.create(role));
    return await this.roleRepository.bulkSave(roles);
  }
}
