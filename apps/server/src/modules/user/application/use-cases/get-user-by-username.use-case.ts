import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDetailModel } from '../../domain/models/user-detail.model';

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    return new UserDetailModel(user);
  }
}
