import { BadRequestException, Injectable } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class ValidateProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute(productIds: string[], storeId: string) {
    const count = await this.productRepository.countByIdsAndStoreId(productIds, storeId);

    if (count !== productIds.length) {
      throw new BadRequestException('Products are not valid');
    }
  }
}
