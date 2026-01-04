import { Injectable, UnauthorizedException } from '@nestjs/common';

import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username-for-auth.use-case';

import { AuthProjectionService } from '../services/auth-projection.service';
import { TokenGeneratorService } from '../services/token-generator.service';

import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
    private authProjectionService: AuthProjectionService,
    private tokenGeneratorService: TokenGeneratorService,
  ) {}

  async execute(authUser: AuthUser) {
    const { storeId } = authUser;
    const user = await this.getUserByUsernameForAuth.execute(authUser.username);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const userData = this.authProjectionService.buildUserData(user, storeId);
    const jwtPayload = this.authProjectionService.buildJwtPayload(user, storeId);

    const accessToken = await this.tokenGeneratorService.generateAccessToken(jwtPayload);

    return { userData, accessToken };
  }
}
