import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from '@/modules/auth/infrastructure/config/password.service';
import { ValidateUserDto } from '../dtos/validate-user.dto';
import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username.use-case';

@Injectable()
export class ValidateUser {
  constructor(
    private passwordService: PasswordService,
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
  ) {}

  async execute(validateUserDto: ValidateUserDto) {
    const { username, password } = validateUserDto;
    const user = await this.getUserByUsernameForAuth.execute(username);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await this.passwordService.comparePassword(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
