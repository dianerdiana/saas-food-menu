import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private storageService: StorageService,
  ) {}

  async execute(updateProductDto: UpdateProductDto & ImageOptionalDto, id: string, userId: string, storeId: string) {
    const { name, price, slug, description, image, storeId: productStoreId } = updateProductDto;

    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product is not found');

    if (slug !== product.slug) {
      const existingStoreSlug = await this.productRepository.findBySlugAndStoreId(slug, storeId);
      if (existingStoreSlug) throw new BadRequestException("Product's slug is already exist");
    }

    product.name = name;
    product.price = price;
    product.slug = slug;
    product.updatedBy = userId;
    if (productStoreId) product.storeId = productStoreId;
    if (description) product.description = description;
    if (image) {
      if (product.image) await this.storageService.deleteFile(product.image);
      product.image = image;
    }

    await this.productRepository.save(product);

    return product;
  }
}
