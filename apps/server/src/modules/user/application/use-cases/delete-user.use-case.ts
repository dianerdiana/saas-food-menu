import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User is not found');
    const updateResult = await this.userRepository.deleteById(user.id);
    return updateResult.affected && true;
  }
}
