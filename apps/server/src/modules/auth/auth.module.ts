import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './infrastructure/config/jwt-config.service';
import { PasswordService } from './infrastructure/config/password.service';
import { ValidateUser } from './application/use-cases/validate-user.use-case';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './interface/controllers/auth.controller';
import { SignIn } from './application/use-cases/sign-in.use-case';

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
  providers: [PasswordService, LocalStrategy, ValidateUser, SignIn],
  exports: [PasswordService],
})
export class AuthModule {}
