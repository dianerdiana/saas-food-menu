import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class GetProductBySlugUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(slug: string) {
    const product = await this.productRepository.findBySlug(slug);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
