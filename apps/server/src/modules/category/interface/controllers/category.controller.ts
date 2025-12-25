// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../application/dtos/update-category.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Use-cases
import { CreateCategoryUseCase } from '../../application/use-case/create-category.use-case';
import { DeleteCategoryUseCase } from '../../application/use-case/delete-category.use-case';
import { GetAllCategoryUseCase } from '../../application/use-case/get-all-category.use-case';
import { GetCategoryByIdUseCase } from '../../application/use-case/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../../application/use-case/update-category.use-case';

@Controller('categories')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private getAllCategoryUseCase: GetAllCategoryUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto, @GetAuthUser() authUser: AuthUser) {
    return await this.createCategoryUseCase.execute(createCategoryDto, authUser);
  }

  @Get()
  async getAllCategory(@Query() paginationDto: PaginationDto) {
    return await this.getAllCategoryUseCase.execute(paginationDto);
  }

  @Get('id/:id')
  async getCategoryById(@Param('id') id: string) {
    return await this.getCategoryByIdUseCase.execute(id);
  }

  @Put(':id')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    return await this.updateCategoryUseCase.execute(updateCategoryDto, id, authUser);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.deleteCategoryUseCase.execute(id, authUser);
  }
}
