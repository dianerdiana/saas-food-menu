import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class GetProductByIdsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(ids: string[]) {
    const products = await this.productRepository.findByIds(ids);
    return products;
  }
}
