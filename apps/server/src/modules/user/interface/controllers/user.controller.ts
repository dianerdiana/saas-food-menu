import { Controller, Get } from '@nestjs/common';
import { GetUserById } from '../../application/use-cases/get-user.use-case';

@Controller()
export class UserController {
  constructor(private readonly getUserById: GetUserById) {}

  @Get()
  getHello(): string {
    return this.getUserById.execute();
  }
}
