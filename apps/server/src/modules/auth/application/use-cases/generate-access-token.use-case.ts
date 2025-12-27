import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(user: AuthUser) {
    const jwtAuthPayload: AuthUser = user;
    const accessToken = await this.jwtService.signAsync(jwtAuthPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.accessToken),
      expiresIn: this.configService.get<number>(JWT_CONFIG.accessTokenExpire),
    });

    return accessToken;
  }
}
