import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { ProductModel } from '../../domain/models/product.model';

@Injectable()
export class GetProductByEmailUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(slug: string) {
    const product = await this.productRepository.findBySlug(slug);

    if (!product) throw new NotFoundException('Product not found');

    return new ProductModel(product);
  }
}
