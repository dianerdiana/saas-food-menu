import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '../user/user.module';
import { StoreModule } from '../store/store.module';

import { AuthProjectionService } from './application/services/auth-projection.service';
import { TokenGeneratorService } from './application/services/token-generator.service';

import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { RefreshAccessTokenUseCase } from './application/use-cases/refresh-access-token.use-case';
import { ChangeStoreUseCase } from './application/use-cases/change-store.use-case';

import { JwtConfigService } from './infrastructure/config/jwt-config.service';
import { PasswordService } from './infrastructure/config/password.service';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { JwtRefreshStrategy } from './infrastructure/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
    StoreModule,
  ],
  providers: [
    JwtStrategy,
    JwtRefreshStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PasswordService,
    LocalStrategy,
    ValidateUserUseCase,
    SignInUseCase,
    SignUpUseCase,
    RefreshAccessTokenUseCase,
    ChangeStoreUseCase,
    AuthProjectionService,
    TokenGeneratorService,
  ],
  exports: [
    PasswordService,
    LocalStrategy,
    ValidateUserUseCase,
    SignInUseCase,
    SignUpUseCase,
    RefreshAccessTokenUseCase,
    ChangeStoreUseCase,
    AuthProjectionService,
    TokenGeneratorService,
  ],
})
export class AuthModule {}
