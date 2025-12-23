import { Module } from '@nestjs/common';
import { UserController } from './interface/controllers/user.controller';
import { GetUserById } from './application/use-cases/get-user-by-id.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { PasswordService } from '../auth/infrastructure/config/password.service';
import { CreateUser } from './application/use-cases/create-user.use-case';
import { GetUserByUsernameForAuth } from './application/use-cases/get-user-by-username-for-auth.use-case';
import { GetAllUser } from './application/use-cases/get-all-user.use-case';
import { UpdateUser } from './application/use-cases/update-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserRepository,
    PasswordService,
    GetUserById,
    CreateUser,
    GetUserByUsernameForAuth,
    GetAllUser,
    UpdateUser,
  ],
  exports: [GetUserById, CreateUser, GetUserByUsernameForAuth],
})
export class UserModule {}
