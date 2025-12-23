// NestJs
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

// Application
import { GetUserById } from '../../application/use-cases/get-user-by-id.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { CreateUser } from '../../application/use-cases/create-user.use-case';
import { GetAllUser } from '../../application/use-cases/get-all-user.use-case';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

// Shared
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { UpdateUser } from '../../application/use-cases/update-user.use-case';
import { Response } from '@/shared/utils/response';
import { UserModel } from '../../domain/models/user.model';

@Controller('users')
export class UserController {
  constructor(
    private getUserById: GetUserById,
    private createUser: CreateUser,
    private getAllUserUseCase: GetAllUser,
    private updateUserUseCase: UpdateUser,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.getUserById.execute(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUser.execute(createUserDto);
  }

  @Get()
  async getAllUser(@Query() paginationDto: PaginationDto) {
    const response = await this.getAllUserUseCase.execute(paginationDto);
    return {
      data: response.users,
      meta: response.meta,
    };
  }

  @Put(':id')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<Response<UserModel>> {
    return {
      message: 'Successfuly updated user',
      data: await this.updateUserUseCase.execute(updateUserDto, id),
    };
  }
}
