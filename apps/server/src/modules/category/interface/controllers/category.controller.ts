import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryResponse } from '../responses/category.response';

import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../application/dtos/update-category.dto';

import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from '../../application/use-cases/delete-category.use-case';
import { GetAllCategoryUseCase } from '../../application/use-cases/get-all-category.use-case';
import { GetCategoryByIdUseCase } from '../../application/use-cases/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../../application/use-cases/update-category.use-case';
import { GetCategoryBySlugUseCase } from '../../application/use-cases/get-category-by-slug.use-case';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';

@Controller('categories')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private getAllCategoryUseCase: GetAllCategoryUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private getCategorySlugUseCase: GetCategoryBySlugUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private storageService: StorageService,
  ) {}

  @UseGuards(PoliciesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.categories);
    }

    const result = await this.createCategoryUseCase.execute({ ...createCategoryDto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created category',
      data: new CategoryResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @Get()
  async getAllCategory(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getAllCategoryUseCase.execute(paginationDto, authUser, ability);
    return {
      data: result.categories.map((category) => new CategoryResponse(category)),
      meta: result.meta,
    };
  }

  @UseGuards(PoliciesGuard)
  @Get('id/:id')
  async getCategoryById(
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getCategoryByIdUseCase.execute(id, authUser, ability);
    return new CategoryResponse(result);
  }

  @UseGuards(PoliciesGuard)
  @Get('slug/:slug')
  async getCategoryBySlug(
    @Param('slug') slug: string,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getCategorySlugUseCase.execute(slug, authUser, ability);
    return new CategoryResponse(result);
  }

  @UseGuards(PoliciesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.categories);
    }

    const result = await this.updateCategoryUseCase.execute(
      { ...updateCategoryDto, image: url },
      id,
      authUser,
      ability,
    );

    return {
      message: 'Successfuly updated category',
      data: new CategoryResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.deleteCategoryUseCase.execute(id, authUser, ability);

    return {
      message: 'Successfuly deleted category',
      data: result,
    };
  }
}
