import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) throw new NotFoundException('Product is not found');
    const updateResult = await this.productRepository.deleteById(product.id);
    return updateResult.affected && true;
  }
}
