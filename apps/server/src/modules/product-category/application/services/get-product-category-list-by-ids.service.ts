import { Injectable } from '@nestjs/common';
import { ProductCategoryRepository } from '../../infrastructure/repositories/product-category.repository';

@Injectable()
export class GetProductCategoryListByIdsService {
  constructor(private productCategoryRepository: ProductCategoryRepository) {}

  async execute(categoryIds?: string[], productIds?: string[]) {
    const productCategories = await this.productCategoryRepository.findManyByIds(categoryIds, productIds);

    return productCategories;
  }
}
