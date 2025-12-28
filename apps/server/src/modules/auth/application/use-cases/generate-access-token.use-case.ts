import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username-for-auth.use-case';

import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';
import { AuthUser } from '@/shared/types/auth-user.type';

import { SignInModel } from '../../domain/models/sign-in.model';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
  ) {}

  async execute(authUser: AuthUser) {
    const user = await this.getUserByUsernameForAuth.execute(authUser.username);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const storeId = user.stores[0]?.id || '';
    const userData = new SignInModel({ ...user, storeId });

    const jwtAuthPayload: AuthUser = {
      userId: userData.id,
      email: userData.email,
      username: userData.username,
      storeId: userData.storeId,
    };

    const accessToken = await this.jwtService.signAsync(jwtAuthPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.accessToken),
      expiresIn: this.configService.get<number>(JWT_CONFIG.accessTokenExpire),
    });

    return { userData, accessToken };
  }
}
