// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Application
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUserUseCase } from '../../application/use-cases/get-all-user.use-case';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { GetUserByEmailUseCase } from '../../application/use-cases/get-user-by-email.use-case';
import { GetUserByPhoneUseCase } from '../../application/use-cases/get-user-by-phone.use-case';
import { GetUserByUsernameUseCase } from '../../application/use-cases/get-user-by-username.use-case';

// Shared
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Controller('users')
export class UserController {
  constructor(
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private getAllUserUseCase: GetAllUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private getUserByPhoneUseCase: GetUserByPhoneUseCase,
    private getUserByUsernameUseCase: GetUserByUsernameUseCase,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.getUserByIdUseCase.execute(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  async getAllUser(@Query() paginationDto: PaginationDto) {
    const result = await this.getAllUserUseCase.execute(paginationDto);
    return {
      data: result.users,
      meta: result.meta,
    };
  }

  @Put(':id')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return {
      message: 'Successfuly updated user',
      data: await this.updateUserUseCase.execute(updateUserDto, id),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute(id);
    return {
      message: `Successfuly deleted ${result} user`,
    };
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.getUserByEmailUseCase.execute(email);
  }

  @Get('/phone/:phone')
  async getUserByPhone(@Param('phone') phone: string) {
    return await this.getUserByPhoneUseCase.execute(phone);
  }

  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.getUserByUsernameUseCase.execute(username);
  }
}
