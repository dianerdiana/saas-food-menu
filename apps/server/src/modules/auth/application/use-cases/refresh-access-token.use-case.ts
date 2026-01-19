import { Injectable, UnauthorizedException } from '@nestjs/common';

import { GetUserByUsernameForAuth } from '@/modules/user/application/use-cases/get-user-by-username-for-auth.use-case';
import { GetStoreByIdUseCase } from '@/modules/store/application/use-cases/get-store-by-id.use-case';

import { AuthProjectionService } from '../services/auth-projection.service';
import { TokenGeneratorService } from '../services/token-generator.service';

import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class RefreshAccessTokenUseCase {
  constructor(
    private getUserByUsernameForAuth: GetUserByUsernameForAuth,
    private authProjectionService: AuthProjectionService,
    private tokenGeneratorService: TokenGeneratorService,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
  ) {}

  async execute(authUser: AuthUser) {
    const { storeId } = authUser;
    const user = await this.getUserByUsernameForAuth.execute(authUser.username);
    const store = await this.getStoreByIdUseCase.execute(storeId);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const userData = this.authProjectionService.buildUserData(user, store);
    const jwtPayload = this.authProjectionService.buildJwtPayload(user, store);

    const accessToken = await this.tokenGeneratorService.generateAccessToken(jwtPayload);

    return { userData, accessToken };
  }
}
