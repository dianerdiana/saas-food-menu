import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthUser } from '@/shared/types/auth-user.type';
import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';

@Injectable()
export class TokenGeneratorService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(jwtPayload: AuthUser) {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.accessToken),
      expiresIn: this.configService.get<number>(JWT_CONFIG.accessTokenExpire),
    });
  }

  async generateRefreshToken(jwtPayload: AuthUser) {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.refreshToken),
      expiresIn: this.configService.get<number>(JWT_CONFIG.refreshTokenExpire),
    });
  }
}
