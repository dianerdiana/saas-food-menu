// NestJs
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// Application
import { GetUserById } from '../../application/use-cases/get-user-by-id.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { CreateUser } from '../../application/use-cases/create-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private getUserById: GetUserById,
    private createUser: CreateUser,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.getUserById.execute(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUser.execute(createUserDto);
  }
}
