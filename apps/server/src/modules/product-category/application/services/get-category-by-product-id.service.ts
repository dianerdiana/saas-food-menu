import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoryRepository } from '../../infrastructure/repositories/product-category.repository';

@Injectable()
export class GetProductCategoryByProductIdService {
  constructor(private productCategoryRepository: ProductCategoryRepository) {}

  async execute(productId: string) {
    const productCategory = await this.productCategoryRepository.findByProductId(productId);

    if (!productCategory) throw new NotFoundException('Product Category is not found');

    return productCategory;
  }
}
