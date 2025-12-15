import { Controller, Get } from '@nestjs/common';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';

@Controller()
export class UserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get()
  getHello(): string {
    return this.getUserUseCase.execute();
  }
}
