import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';
import { CreateUserUseCase } from '@/modules/user/application/use-cases/create-user.use-case';

import { UserStatus } from '@/shared/enums/user-status.enum';

@Injectable()
export class SignUpUseCase {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(createUserDto: CreateUserDto) {
    const user = this.createUserUseCase.execute({ ...createUserDto, status: UserStatus.Active });
    return user;
  }
}
