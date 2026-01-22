import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { PasswordService } from '@/modules/auth/infrastructure/config/password.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  create(dto: CreateUserDto) {
    return this.userRepository.create(dto);
  }

  async save(user: UserEntity) {
    const existingEmail = await this.userRepository.findByEmail(user.email);
    if (existingEmail) throw new BadRequestException('Email is already exist');

    const existingUsername = await this.userRepository.findByUsername(user.username);
    if (existingUsername) throw new BadRequestException('Username is already exist');

    const existingPhone = await this.userRepository.findByPhone(user.phone);
    if (existingPhone) throw new BadRequestException('Phone number is already used');

    const hashPassword = await this.passwordService.hashPassword(user.password);
    user.password = hashPassword;

    return await this.userRepository.save(user);
  }
}
