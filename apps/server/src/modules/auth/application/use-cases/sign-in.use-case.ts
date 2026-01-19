import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { GetStoreByIdUseCase } from '@/modules/store/application/use-cases/get-store-by-id.use-case';

import { AuthProjectionService } from '../services/auth-projection.service';
import { TokenGeneratorService } from '../services/token-generator.service';

@Injectable()
export class SignInUseCase {
  constructor(
    private authProjectionService: AuthProjectionService,
    private tokenGeneratorService: TokenGeneratorService,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
  ) {}

  async execute(user: UserEntity) {
    const storeId = user.stores[0]?.id || '';

    const store = await this.getStoreByIdUseCase.execute(storeId);

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
