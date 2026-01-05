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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';

import { ProductResponse } from '../responses/product.response';

import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';

import { CreateProductUseCase } from '../../application/use-case/create-product.use-case';
import { DeleteProductUseCase } from '../../application/use-case/delete-product.use-case';
import { GetAllProductUseCase } from '../../application/use-case/get-all-product.use-case';
import { GetProductByIdUseCase } from '../../application/use-case/get-product-by-id.use-case';
import { UpdateProductUseCase } from '../../application/use-case/update-product.use-case';
import { GetProductBySlugUseCase } from '../../application/use-case/get-product-by-slug.use-case';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { Action, Subject } from '@/shared/enums/access-control.enum';

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

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.Product))
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }
    const result = await this.createProductUseCase.execute({ ...createProductDto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created product',
      data: new ProductResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Product))
  @Get()
  async getAllProduct(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getAllProductUseCase.execute(paginationDto, authUser, ability);
    return {
      data: result.products.map((product) => new ProductResponse(product)),
      meta: result.meta,
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Product))
  @Get('id/:id')
  async getProductById(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.getProductByIdUseCase.execute(id, authUser, ability);
    return new ProductResponse(result);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Product))
  @Get('slug/:slug')
  async getProductBySlug(
    @Param('slug') slug: string,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getProductSlugUseCase.execute(slug, authUser, ability);
    return new ProductResponse(result);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Update, Subject.Product))
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.updateProductUseCase.execute({ ...updateProductDto, image: url }, id, authUser, ability);

    return {
      message: 'Successfuly updated product',
      data: new ProductResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, Subject.Product))
  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.deleteProductUseCase.execute(id, authUser, ability);

    return {
      message: 'Successfuly deleted product',
      data: result,
    };
  }
}
