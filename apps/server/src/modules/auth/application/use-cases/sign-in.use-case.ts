import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

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
    const permissions = user.userRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => {
        const permission = rp.permission;
        return {
          action: permission.action,
          subject: permission.subject,
        };
      }),
    );
    const storeId = user.stores[0]?.id || '';
    const userData = { ...user, storeId, permissions };

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

    const refreshToken = await this.jwtService.signAsync(jwtAuthPayload, {
      secret: this.configService.get<string>(JWT_CONFIG.refreshToken),
      expiresIn: this.configService.get<number>(JWT_CONFIG.refreshTokenExpire),
    });

    return {
      userData,
      accessToken,
      refreshToken,
    };
  }
}
