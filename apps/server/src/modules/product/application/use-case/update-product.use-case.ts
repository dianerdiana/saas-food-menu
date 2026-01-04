import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(updateProductDto: UpdateProductDto & { image?: string | null }, productId: string, authUser: AuthUser) {
    const { categoryId, name, price, slug, description, image } = updateProductDto;
    const product = await this.productRepository.findById(productId);
    if (!product) throw new NotFoundException('Product is not found');

    product.name = name;
    product.price = price;
    product.slug = slug;
    product.updatedBy = authUser.userId;
    if (description) product.description = description;
    if (image) product.image = image;

    await this.productRepository.save(product);

    return product;
  }
}
