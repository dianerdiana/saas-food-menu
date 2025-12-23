import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';
import { CreateUser } from '@/modules/user/application/use-cases/create-user.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignUp {
  constructor(private createUser: CreateUser) {}

  async execute(createUserDto: CreateUserDto) {
    const user = this.createUser.execute(createUserDto);
    return user;
  }
}
