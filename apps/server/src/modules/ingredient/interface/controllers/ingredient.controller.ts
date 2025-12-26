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
import { GetIngredientBySlugUseCase } from '../../application/use-case/get-ingredient-by-slug.use-case';

@Controller('categories')
export class IngredientController {
  constructor(
    private createIngredientUseCase: CreateIngredientUseCase,
    private deleteIngredientUseCase: DeleteIngredientUseCase,
    private getAllIngredientUseCase: GetAllIngredientUseCase,
    private getIngredientByIdUseCase: GetIngredientByIdUseCase,
    private getIngredientSlugUseCase: GetIngredientBySlugUseCase,
    private updateIngredientUseCase: UpdateIngredientUseCase,
  ) {}

  @Post()
  async createIngredient(@Body() createIngredientDto: CreateIngredientDto, @GetAuthUser() authUser: AuthUser) {
    const result = await this.createIngredientUseCase.execute(createIngredientDto, authUser);

    return {
      message: 'Successfuly created ingredient',
      data: result,
    };
  }

  @Get()
  async getAllIngredient(@Query() paginationDto: PaginationDto) {
    const result = await this.getAllIngredientUseCase.execute(paginationDto);
    return {
      data: result.ingredients,
      meta: result.meta,
    };
  }

  @Get('id/:id')
  async getIngredientById(@Param('id') id: string) {
    return await this.getIngredientByIdUseCase.execute(id);
  }

  @Get('slug/:slug')
  async getIngredientBySlug(@Param('slug') slug: string) {
    return await this.getIngredientSlugUseCase.execute(slug);
  }

  @Put(':id')
  async updateIngredient(
    @Body() updateIngredientDto: UpdateIngredientDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    const result = await this.updateIngredientUseCase.execute(updateIngredientDto, id, authUser);

    return {
      message: 'Successfuly updated ingredient',
      data: result,
    };
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    const result = await this.deleteIngredientUseCase.execute(id, authUser);

    return {
      message: 'Successfuly deleted ingredient',
      data: result,
    };
  }
}
