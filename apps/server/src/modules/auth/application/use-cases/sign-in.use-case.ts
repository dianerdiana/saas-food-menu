import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';

import { AuthProjectionService } from '../services/auth-projection.service';
import { TokenGeneratorService } from '../services/token-generator.service';

@Injectable()
export class SignInUseCase {
  constructor(
    private authProjectionService: AuthProjectionService,
    private tokenGeneratorService: TokenGeneratorService,
  ) {}

  async execute(user: UserEntity) {
    const storeId = user.stores[0]?.id || '';
    const userData = this.authProjectionService.buildUserData(user, storeId);
    const jwtPayload = this.authProjectionService.buildJwtPayload(user, storeId);

    const accessToken = await this.tokenGeneratorService.generateAccessToken(jwtPayload);
    const refreshToken = await this.tokenGeneratorService.generateRefreshToken(jwtPayload);

    return {
      userData,
      accessToken,
      refreshToken,
    };
  }
}
