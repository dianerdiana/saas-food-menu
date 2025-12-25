import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_CONFIG.accessToken) || JWT_CONFIG.accessToken,
    });
  }

  async validate(authUser: AuthUser) {
    return authUser;
  }
}
