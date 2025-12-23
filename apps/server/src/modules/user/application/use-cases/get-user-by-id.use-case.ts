import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDetailModel } from '../../domain/models/user-detail.model';

@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return new UserDetailModel(user);
  }
}
