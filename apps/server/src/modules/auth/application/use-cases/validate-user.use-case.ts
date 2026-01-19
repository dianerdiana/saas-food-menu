import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PasswordService } from '@/modules/auth/infrastructure/config/password.service';
import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username-for-auth.use-case';

import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private passwordService: PasswordService,
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
  ) {}

  async execute(dto: SignInDto) {
    const { username, password } = dto;
    const user = await this.getUserByUsernameForAuth.execute(username);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await this.passwordService.comparePassword(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
