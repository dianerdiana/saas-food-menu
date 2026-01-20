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

import { ProductResponse, ProductWithStoreResponse } from '../responses/product.response';
import { GetProductListDash } from '../../application/use-cases/product/get-product-list.dash';
import { CreateProductDash } from '../../application/use-cases/product/create-product.dash';
import { UpdateProductDash } from '../../application/use-cases/product/update-product.dash';
import { DeleteProductDash } from '../../application/use-cases/product/delete-product.dash';

import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { CreateProductDto } from '@/modules/product/application/dtos/create-product.dto';
import { UpdateProductDto } from '@/modules/product/application/dtos/update-product.dto';

import { GetProductByIdUseCase } from '@/modules/product/application/use-cases/get-product-by-id.use-case';
import { GetProductBySlugUseCase } from '@/modules/product/application/use-cases/get-product-by-slug.use-case';

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
@Controller('/dash/products')
export class ProductController {
  constructor(
    private storageService: StorageService,

    private getProductListDash: GetProductListDash,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private getProductBySlugUseCase: GetProductBySlugUseCase,

    private createProductDash: CreateProductDash,
    private updateProductDash: UpdateProductDash,

    private deleteProductDash: DeleteProductDash,
  ) {}

  @Get()
  async getProductList(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getProductListDash.execute(paginationDto, authUser, ability);

    return {
      data: result.products.map((product) => new ProductWithStoreResponse(product)),
      meta: result.meta,
    };
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Product))
  @Get('id/:id')
  async getProductById(@Param('id') id: string) {
    const result = await this.getProductByIdUseCase.execute(id);
    return new ProductResponse(result);
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Product))
  @Get('slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    const result = await this.getProductBySlugUseCase.execute(slug);
    return new ProductResponse(result);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProduct(
    @Body() dto: CreateProductDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.createProductDash.execute({ ...dto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created product',
      data: new ProductResponse(result),
    };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.updateProductDash.execute(id, { ...dto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created product',
      data: new ProductResponse(result),
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.deleteProductDash.execute(id, authUser, ability);
    return {
      message: 'Successfuly deleted product',
      data: result,
    };
  }
}
