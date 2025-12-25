import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_CONFIG.accessToken) || JWT_CONFIG.accessToken,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
  }
}
