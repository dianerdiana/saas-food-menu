import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInModel } from '../../domain/models/sign-in.model';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(user: UserEntity) {
    const storeId = user.stores[0]?.id || '';
    const userData = new SignInModel({ ...user, storeId });

    const jwtAuthPayload: AuthUser = {
      userId: userData.id,
      email: userData.email,
      username: userData.username,
      storeId: userData.storeId,
    };
    const accessToken = await this.jwtService.signAsync(jwtAuthPayload);
    const refreshToken = await this.jwtService.signAsync(jwtAuthPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.refreshToken),
    });

    return {
      userData,
      accessToken,
      refreshToken,
    };
  }
}
