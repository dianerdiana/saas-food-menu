import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';

import { GetUserByIdUseCase } from '@/modules/user/application/use-cases/get-user-by-id.use-case';
import { GetAllUserUseCase } from '@/modules/user/application/use-cases/get-all-user.use-case';
import { UpdateUserDto } from '@/modules/user/application/dtos/update-user.dto';
import { UpdateUserUseCase } from '@/modules/user/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@/modules/user/application/use-cases/delete-user.use-case';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { UserDataResponse } from '@/shared/responses/auth.response';

@Controller('dash/users')
export class DashUserController {
  constructor(
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getAllUserUseCase: GetAllUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  async getAllUser(@Query() paginationDto: PaginationDto) {
    const result = await this.getAllUserUseCase.execute(paginationDto);
    return {
      data: result.users,
      meta: result.meta,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(id);
    return {
      data: new UserDataResponse(user),
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
}
