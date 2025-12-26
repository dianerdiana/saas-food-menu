// NestJs
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Dto
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../../application/dtos/update-category.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';

// Use-cases
import { CreateCategoryUseCase } from '../../application/use-case/create-category.use-case';
import { DeleteCategoryUseCase } from '../../application/use-case/delete-category.use-case';
import { GetAllCategoryUseCase } from '../../application/use-case/get-all-category.use-case';
import { GetCategoryByIdUseCase } from '../../application/use-case/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../../application/use-case/update-category.use-case';
import { GetCategoryBySlugUseCase } from '../../application/use-case/get-category-by-slug.use-case';

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

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
  ) {
    if (!image) throw new BadRequestException('Image is not found');

    const url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.categories);
    const result = await this.createCategoryUseCase.execute({ ...createCategoryDto, image: url }, authUser);

    return {
      message: 'Successfuly created category',
      data: result,
    };
  }

  @Get()
  async getAllCategory(@Query() paginationDto: PaginationDto) {
    const result = await this.getAllCategoryUseCase.execute(paginationDto);
    return {
      data: result.categories,
      meta: result.meta,
    };
  }

  @Get('id/:id')
  async getCategoryById(@Param('id') id: string) {
    return await this.getCategoryByIdUseCase.execute(id);
  }

  @Get('slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return await this.getCategorySlugUseCase.execute(slug);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.categories);
    }

    const result = await this.updateCategoryUseCase.execute({ ...updateCategoryDto, image: url }, id, authUser);

    return {
      message: 'Successfuly updated category',
      data: result,
    };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    const result = await this.deleteCategoryUseCase.execute(id, authUser);

    return {
      message: 'Successfuly deleted category',
      data: result,
    };
  }
}
