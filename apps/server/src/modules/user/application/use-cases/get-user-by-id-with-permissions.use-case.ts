import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Injectable()
export class GetUserByIdWithPermissions {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    return await this.userRepository.findByIdWithPermissions(userId);
  }
}
