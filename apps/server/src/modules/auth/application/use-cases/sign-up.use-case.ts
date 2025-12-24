import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';
import { CreateUserUseCase } from '@/modules/user/application/use-cases/create-user.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignUpUseCase {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(createUserDto: CreateUserDto) {
    const user = this.createUserUseCase.execute(createUserDto);
    return user;
  }
}
