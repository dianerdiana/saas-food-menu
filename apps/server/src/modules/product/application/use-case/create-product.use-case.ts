import { Injectable } from '@nestjs/common';

import { ProductCategoryEntity } from '@/modules/product-category/domain/entities/product-category.entity';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { PRODUCT_STATUS } from '@/shared/constants/product-status.constant';

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto & { image: string }, authUser: AuthUser) {
    const product = this.productRepository.create({
      ...createProductDto,
      storeId: authUser.storeId,
      createdBy: authUser.userId,
      status: PRODUCT_STATUS.active,
    });

    const productCategory = new ProductCategoryEntity();
    productCategory.productId = product.id;
    productCategory.categoryId = createProductDto.categoryId;

    product.productCategories = [productCategory];

    await this.productRepository.save(product);

    return product;
  }
}
