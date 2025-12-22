import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Injectable()
export class GetUserByUsernameForAuth {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string) {
    return await this.userRepository.findByUsernameForAuth(username);
  }
}
