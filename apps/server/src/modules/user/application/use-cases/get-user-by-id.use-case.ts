import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserModel } from '../../domain/models/user.model';

@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return new UserModel(user);
  }
}
