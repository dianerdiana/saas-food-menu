// NestJs
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

// Import Modules
import { UserModule } from '../user/user.module';

// Application
import { ValidateUser } from './application/use-cases/validate-user.use-case';
import { SignIn } from './application/use-cases/sign-in.use-case';
import { SignUp } from './application/use-cases/sign-up.use-case';

// Infrastructure
import { JwtConfigService } from './infrastructure/config/jwt-config.service';
import { PasswordService } from './infrastructure/config/password.service';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { AuthController } from './interface/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';

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
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PasswordService,
    LocalStrategy,
    ValidateUser,
    SignIn,
    SignUp,
  ],
  exports: [PasswordService],
})
export class AuthModule {}
