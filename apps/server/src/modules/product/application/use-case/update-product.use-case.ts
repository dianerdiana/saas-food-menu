import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { AssignProductCategoryService } from '@/modules/product-category/application/services/assign-product-category.service';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private assignProductCategoryService: AssignProductCategoryService,
    private storageService: StorageService,
  ) {}

  async execute(
    updateProductDto: UpdateProductDto & ImageOptionalDto,
    id: string,
    authUser: AuthUser,
    ability: AppAbility,
  ) {
    const { storeId, userId } = authUser;
    const { categoryId, name, price, slug, description, image, storeId: payloadStoreId } = updateProductDto;
    const productStoreId = ability.can(Action.Manage, Subject.Product) && payloadStoreId ? payloadStoreId : storeId;

    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product is not found');

    if (slug !== product.slug) {
      const existingStoreSlug = await this.productRepository.findBySlugAndStoreId(slug, productStoreId);
      if (existingStoreSlug) throw new BadRequestException("Product's slug is already exist");
    }

    if (!ability.can(Action.Update, product)) {
      throw new ForbiddenException('You are not allowed to update this product');
    }

    const categoryIds = [categoryId];

    product.name = name;
    product.price = price;
    product.slug = slug;
    product.updatedBy = userId;
    product.storeId = productStoreId;
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
