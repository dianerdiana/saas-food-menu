import { Module } from '@nestjs/common';
import { GetUserUseCase } from 'src/modules/user/application/use-cases/get-user.use-case';
import { UserController } from 'src/modules/user/interface/http/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [GetUserUseCase],
})
export class AppModule {}
