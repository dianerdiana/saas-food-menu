import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUserById } from '../../application/use-cases/get-user-by-id.use-case';
import { UserModel } from '../../domain/models/user.model';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { CreateUser } from '../../application/use-cases/create-user.use-case';
import { Public } from '@/shared/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(
    private getUserById: GetUserById,
    private createUser: CreateUser,
  ) {}

  @Public()
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return await this.getUserById.execute(id);
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUser.execute(createUserDto);
  }
}
