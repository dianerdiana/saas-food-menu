import { BadRequestException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { AssignProductCategoryService } from '@/modules/product-category/application/services/assign-product-category.service';
import { ValidateCategoriesService } from '@/modules/category/application/services/validate-categories.service';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { PRODUCT_STATUS } from '@/shared/constants/product-status.constant';

const MAX_PRODUCTS = 50;

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private assignProductCategoryService: AssignProductCategoryService,
    private validateCategoriesService: ValidateCategoriesService,
  ) {}

  async execute(createProductDto: CreateProductDto & ImageOptionalDto, authUser: AuthUser, ability: AppAbility) {
    const { storeId, userId } = authUser;
    const { categoryId, storeId: payloadStoreId, slug } = createProductDto;
    const productStoreId = ability.can(Action.Manage, Subject.Product) && payloadStoreId ? payloadStoreId : storeId;

    const existingStoreSlug = await this.productRepository.findBySlugAndStoreId(slug, storeId);
    if (existingStoreSlug) throw new BadRequestException("Product's slug is already exist");

    const ownedProductsCount = await this.productRepository.countAllOwned(storeId);
    const maxProducts = ability.can(Action.Manage, Subject.Product) ? null : MAX_PRODUCTS;

    if (maxProducts !== null && ownedProductsCount >= maxProducts) {
      throw new BadRequestException('You already reached product limit');
    }

    const categoryIds = [categoryId];
    await this.validateCategoriesService.execute(categoryIds, storeId);

    const product = this.productRepository.create({
      ...createProductDto,
      storeId: productStoreId,
      createdBy: userId,
      status: PRODUCT_STATUS.active,
    });

    await this.productRepository.save(product);
    await this.assignProductCategoryService.assign(product.id, categoryIds);

    return product;
  }
}
