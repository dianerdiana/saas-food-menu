import { Injectable } from '@nestjs/common';
import { SignInModel } from '../../domain/models/sign-in.model';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { JwtAuthPayload } from '@/shared/types/jwt-auth.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';

@Injectable()
export class SignIn {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(user: UserEntity) {
    const jwtAuthPayload: JwtAuthPayload = { sub: user.id, email: user.email, username: user.username };
    const accessToken = await this.jwtService.signAsync(jwtAuthPayload);
    const refreshToken = await this.jwtService.signAsync(jwtAuthPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.refreshToken),
    });

    return {
      userData: new SignInModel(user),
      accessToken,
      refreshToken,
    };
  }
}
