// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateIngredientDto } from '../../application/dtos/create-ingredient.dto';
import { UpdateIngredientDto } from '../../application/dtos/update-ingredient.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Use-cases
import { CreateIngredientUseCase } from '../../application/use-case/create-ingredient.use-case';
import { DeleteIngredientUseCase } from '../../application/use-case/delete-ingredient.use-case';
import { GetAllIngredientUseCase } from '../../application/use-case/get-all-ingredient.use-case';
import { GetIngredientByIdUseCase } from '../../application/use-case/get-ingredient-by-id.use-case';
import { UpdateIngredientUseCase } from '../../application/use-case/update-ingredient.use-case';

@Controller('ingredients')
export class IngredientController {
  constructor(
    private createIngredientUseCase: CreateIngredientUseCase,
    private deleteIngredientUseCase: DeleteIngredientUseCase,
    private getAllIngredientUseCase: GetAllIngredientUseCase,
    private getIngredientByIdUseCase: GetIngredientByIdUseCase,
    private updateIngredientUseCase: UpdateIngredientUseCase,
  ) {}

  @Post()
  async createIngredient(@Body() createIngredientDto: CreateIngredientDto, @GetAuthUser() authUser: AuthUser) {
    return await this.createIngredientUseCase.execute(createIngredientDto, authUser);
  }

  @Get()
  async getAllIngredient(@Query() paginationDto: PaginationDto) {
    return await this.getAllIngredientUseCase.execute(paginationDto);
  }

  @Get('id/:id')
  async getIngredientById(@Param('id') id: string) {
    return await this.getIngredientByIdUseCase.execute(id);
  }

  @Put(':id')
  async updateIngredient(
    @Body() updateIngredientDto: UpdateIngredientDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    return await this.updateIngredientUseCase.execute(updateIngredientDto, id, authUser);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.deleteIngredientUseCase.execute(id, authUser);
  }
}
