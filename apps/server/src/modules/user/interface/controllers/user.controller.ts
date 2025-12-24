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
    const response = await this.getAllUserUseCase.execute(paginationDto);
    return {
      data: response.users,
      meta: response.meta,
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
    return await this.deleteUserUseCase.execute(id);
  }
}
