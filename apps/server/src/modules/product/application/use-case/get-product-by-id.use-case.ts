import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { ProductModel } from '../../domain/models/product.model';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) throw new NotFoundException('Product not found');

    return new ProductModel(product);
  }
}
