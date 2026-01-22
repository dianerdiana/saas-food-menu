import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../../infrastructure/repositories/role.repository';

@Injectable()
export class GetRoleByNameUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async execute(name: string) {
    const role = await this.roleRepository.findByName(name);

    if (!role) throw new NotFoundException('Role is not found');

    return role;
  }
}
