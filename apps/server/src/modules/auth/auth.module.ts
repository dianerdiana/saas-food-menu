// NestJs
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

// Import Modules
import { UserModule } from '../user/user.module';
import { StoreModule } from '../store/store.module';

// Use-cases
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { GenerateAccessTokenUseCase } from './application/use-cases/generate-access-token.use-case';
import { ChangeStoreUseCase } from './application/use-cases/change-store.use-case';

// Infrastructure
import { JwtConfigService } from './infrastructure/config/jwt-config.service';
import { PasswordService } from './infrastructure/config/password.service';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { AuthController } from './interface/controllers/auth.controller';
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
  controllers: [AuthController],
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
    GenerateAccessTokenUseCase,
    ChangeStoreUseCase,
  ],
  exports: [PasswordService],
})
export class AuthModule {}
