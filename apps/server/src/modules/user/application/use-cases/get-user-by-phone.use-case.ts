import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDetailModel } from '../../domain/models/user-detail.model';

@Injectable()
export class GetUserByPhoneUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(phone: string) {
    const user = await this.userRepository.findByPhone(phone);

    if (!user) throw new NotFoundException('User not found');

    return new UserDetailModel(user);
  }
}
