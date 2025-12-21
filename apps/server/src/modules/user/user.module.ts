import { Module } from '@nestjs/common';
import { UserController } from './interface/controllers/user.controller';
import { GetUserById } from './application/use-cases/get-user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [GetUserById],
})
export class UserModule {}
