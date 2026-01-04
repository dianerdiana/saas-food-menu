import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { GetStoreByIdUseCase } from '@/modules/store/application/use-case/get-store-by-id.use-case';
import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username-for-auth.use-case';

import { JWT_CONFIG } from '@/shared/constants/jwt-config.constant';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class ChangeStoreUseCase {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
  ) {}

  async execute(authUser: AuthUser, storeId: string) {
    const store = await this.getStoreByIdUseCase.execute(storeId);
    const user = await this.getUserByUsernameForAuth.execute(authUser.username);

    if (store.ownerId !== authUser.userId) throw new ForbiddenException('You are not allowed');
    if (!user) throw new UnauthorizedException();

    const permissions = user.userRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => {
        const permission = rp.permission;
        return {
          action: permission.action,
          subject: permission.subject,
        };
      }),
    );
    const roles = user.userRoles.map((userRole) => userRole.role.name);
    const userData = { ...user, storeId: store.id, roles, permissions };

    const jwtAuthPayload: AuthUser = {
      userId: userData.id,
      email: userData.email,
      username: userData.username,
      storeId: store.id,
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
