import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordService } from '@/modules/auth/infrastructure/config/password.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserModel } from '../../domain/models/user.model';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  async execute(updateUserDto: UpdateUserDto, userId: string) {
    const { firstName, lastName, email, username, phone, status, password } = updateUserDto;
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('User is not found');

    user.firstName = firstName;
    user.email = email;
    user.username = username;
    user.phone = phone;

    if (lastName !== undefined) user.lastName = lastName;
    if (status) user.status = status;
    if (password) {
      const hashPassword = await this.passwordService.hashPassword(password);
      user.password = hashPassword;
    }

    await this.userRepository.save(user);
    return new UserModel(user);
  }
}
