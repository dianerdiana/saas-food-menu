import { Module } from '@nestjs/common';
import { UserController } from './interface/controllers/user.controller';
import { GetUserById } from './application/use-cases/get-user-by-id.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { PasswordService } from '../auth/infrastructure/config/password.service';
import { AuthModule } from '../auth/auth.module';
import { CreateUser } from './application/use-cases/create-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserRepository, PasswordService, GetUserById, CreateUser],
  exports: [GetUserById, CreateUser],
})
export class UserModule {}
