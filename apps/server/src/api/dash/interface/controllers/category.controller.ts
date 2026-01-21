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

import { CategoryResponse, CategoryWithStoreResponse } from '@/shared/responses/category.response';

import { GetCategoryListDash } from '../../application/use-cases/category/get-category-list.dash';
import { CreateCategoryDash } from '../../application/use-cases/category/create-category.dash';
import { UpdateCategoryDash } from '../../application/use-cases/category/update-category.dash';
import { DeleteCategoryDash } from '../../application/use-cases/category/delete-category.dash';

import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { CreateCategoryDto } from '@/modules/category/application/dtos/create-category.dto';
import { UpdateCategoryDto } from '@/modules/category/application/dtos/update-category.dto';

import { GetCategoryByIdUseCase } from '@/modules/category/application/use-cases/get-category-by-id.use-case';
import { GetCategoryBySlugUseCase } from '@/modules/category/application/use-cases/get-category-by-slug.use-case';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@UseGuards(PoliciesGuard)
@Controller('/dash/categories')
export class DashCategoryController {
  constructor(
    private storageService: StorageService,

    private getCategoryListDash: GetCategoryListDash,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private getCategoryBySlugUseCase: GetCategoryBySlugUseCase,

    private createCategoryDash: CreateCategoryDash,
    private updateCategoryDash: UpdateCategoryDash,

    private deleteCategoryDash: DeleteCategoryDash,
  ) {}

  @Get()
  async getCategoryList(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getCategoryListDash.execute(paginationDto, authUser, ability);

    return {
      data: result.categories.map((category) => new CategoryWithStoreResponse(category)),
      meta: result.meta,
    };
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Category))
  @Get('id/:id')
  async getCategoryById(@Param('id') id: string) {
    const result = await this.getCategoryByIdUseCase.execute(id);
    return new CategoryResponse(result);
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Category))
  @Get('slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    const result = await this.getCategoryBySlugUseCase.execute(slug);
    return new CategoryResponse(result);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(
        image,
        `${BUCKET_FOLDER_NAME.categories}/${authUser.storeName}`,
      );
    }

    const result = await this.createCategoryDash.execute({ ...dto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created category',
      data: new CategoryResponse(result),
    };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(
        image,
        `${BUCKET_FOLDER_NAME.categories}/${authUser.storeName}`,
      );
    }

    const result = await this.updateCategoryDash.execute(id, { ...dto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created category',
      data: new CategoryResponse(result),
    };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.deleteCategoryDash.execute(id, authUser, ability);
    return {
      message: 'Successfuly deleted category',
      data: result,
    };
  }
}
