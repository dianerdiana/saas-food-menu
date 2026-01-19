import { BadRequestException, Injectable } from '@nestjs/common';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { PRODUCT_STATUS } from '@/shared/constants/product-status.constant';

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  create(dto: CreateProductDto & ImageOptionalDto, userId: string) {
    const product = this.productRepository.create({
      ...dto,
      createdBy: userId,
      status: PRODUCT_STATUS.active,
    });

    return product;
  }

  async save(product: ProductEntity, maxProducts: number | null) {
    const existingProductSlug = await this.productRepository.findBySlug(product.slug);
    if (existingProductSlug) throw new BadRequestException("Product's slug is already exist");

    const ownedProductCount = await this.productRepository.countAllOwned(product.storeId);

    if (maxProducts !== null && ownedProductCount >= maxProducts) {
      throw new BadRequestException('You already reached product limit');
    }

    await this.productRepository.save(product);

    return product;
  }
}
