import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { GetStoreByIdUseCase } from '@/modules/store/application/use-cases/get-store-by-id.use-case';
import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username-for-auth.use-case';

import { AuthUser } from '@/shared/types/auth-user.type';
import { TokenGeneratorService } from '../services/token-generator.service';
import { AuthProjectionService } from '../services/auth-projection.service';

@Injectable()
export class ChangeStoreUseCase {
  constructor(
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
    private authProjectionService: AuthProjectionService,
    private tokenGeneratorService: TokenGeneratorService,
  ) {}

  async execute(authUser: AuthUser, storeId: string, bypassAccess?: boolean) {
    const user = await this.getUserByUsernameForAuth.execute(authUser.username);
    if (!user) throw new UnauthorizedException();

    const store = await this.getStoreByIdUseCase.execute(storeId);

    if (!bypassAccess && store.ownerId !== authUser.userId) {
      throw new ForbiddenException('You are not allowed');
    }

    const userData = this.authProjectionService.buildUserData(user, store);
    const jwtPayload = this.authProjectionService.buildJwtPayload(user, store);

    const accessToken = await this.tokenGeneratorService.generateAccessToken(jwtPayload);
    const refreshToken = await this.tokenGeneratorService.generateRefreshToken(jwtPayload);

    return {
      userData,
      accessToken,
      refreshToken,
    };
  }
}
