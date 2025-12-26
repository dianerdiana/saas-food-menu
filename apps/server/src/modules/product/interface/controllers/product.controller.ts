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
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';

// Use-cases
import { CreateProductUseCase } from '../../application/use-case/create-product.use-case';
import { DeleteProductUseCase } from '../../application/use-case/delete-product.use-case';
import { GetAllProductUseCase } from '../../application/use-case/get-all-product.use-case';
import { GetProductByIdUseCase } from '../../application/use-case/get-product-by-id.use-case';
import { UpdateProductUseCase } from '../../application/use-case/update-product.use-case';
import { GetProductBySlugUseCase } from '../../application/use-case/get-product-by-slug.use-case';

@Controller('products')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private getAllProductUseCase: GetAllProductUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private getProductSlugUseCase: GetProductBySlugUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
  ) {
    if (!image) throw new BadRequestException('Image is not found');

    const url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    const result = await this.createProductUseCase.execute({ ...createProductDto, image: url }, authUser);

    return {
      message: 'Successfuly created product',
      data: result,
    };
  }

  @Get()
  async getAllProduct(@Query() paginationDto: PaginationDto) {
    const result = await this.getAllProductUseCase.execute(paginationDto);
    return {
      data: result.products,
      meta: result.meta,
    };
  }

  @Get('id/:id')
  async getProductById(@Param('id') id: string) {
    return await this.getProductByIdUseCase.execute(id);
  }

  @Get('slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.getProductSlugUseCase.execute(slug);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.updateProductUseCase.execute({ ...updateProductDto, image: url }, id, authUser);

    return {
      message: 'Successfuly updated product',
      data: result,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    const result = await this.deleteProductUseCase.execute(id, authUser);

    return {
      message: 'Successfuly deleted product',
      data: result,
    };
  }
}
