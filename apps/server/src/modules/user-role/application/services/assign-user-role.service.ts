import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../../infrastructure/repositories/user-role.repository';

@Injectable()
export class AssignUserRoleService {
  constructor(private userRoleRepository: UserRoleRepository) {}

  async assign(userId: string, roleId: string) {
    const userRole = this.userRoleRepository.create({ userId, roleId });

    return await this.userRoleRepository.bulkSave([userRole]);
  }
}
