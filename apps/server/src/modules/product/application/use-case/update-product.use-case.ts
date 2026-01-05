import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { AssignProductCategoryService } from '@/modules/product-category/application/services/assign-product-category.service';
import { ValidateCategoriesService } from '@/modules/category/application/services/validate-categories.service';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action } from '@/shared/enums/access-control.enum';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private assignProductCategoryService: AssignProductCategoryService,
    private storageService: StorageService,
    private validateCategoriesService: ValidateCategoriesService,
  ) {}

  async execute(
    updateProductDto: UpdateProductDto & ImageOptionalDto,
    id: string,
    authUser: AuthUser,
    ability: AppAbility,
  ) {
    const { storeId } = authUser;
    const { categoryId, name, price, slug, description, image } = updateProductDto;

    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product is not found');

    if (!ability.can(Action.Update, product)) {
      throw new ForbiddenException('You are not allowed to update this product');
    }

    const categoryIds = [categoryId];
    await this.validateCategoriesService.execute(categoryIds, storeId);

    product.name = name;
    product.price = price;
    product.slug = slug;
    product.updatedBy = authUser.userId;
    if (description) product.description = description;
    if (image) {
      if (product.image) await this.storageService.deleteFile(product.image);
      product.image = image;
    }

    await this.productRepository.save(product);
    await this.assignProductCategoryService.assign(product.id, categoryIds);

    return product;
  }
}
