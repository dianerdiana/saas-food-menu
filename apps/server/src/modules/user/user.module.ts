// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import Services
import { PasswordService } from '../auth/infrastructure/config/password.service';

// Entity
import { UserEntity } from './domain/entities/user.entity';

// Controller
import { UserController } from './interface/controllers/user.controller';

// Repository
import { UserRepository } from './infrastructure/repositories/user.repository';

// Use-cases
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { GetUserByUsernameForAuth } from './application/use-cases/get-user-by-username-for-auth.use-case';
import { GetAllUserUseCase } from './application/use-cases/get-all-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserRepository,
    PasswordService,
    GetUserByUsernameForAuth,
    GetUserByIdUseCase,
    CreateUserUseCase,
    GetAllUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [GetUserByIdUseCase, CreateUserUseCase, GetUserByUsernameForAuth],
})
export class UserModule {}
