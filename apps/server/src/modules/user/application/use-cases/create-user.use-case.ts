import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { PasswordService } from '@/modules/auth/infrastructure/config/password.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserModel } from '../../domain/models/user.model';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const hashPassword = await this.passwordService.hashPassword(createUserDto.password);
    const newUser = await this.userRepository.create(createUserDto);

    newUser.password = hashPassword;

    await this.userRepository.save(newUser);
    return new UserModel(newUser);
  }
}
