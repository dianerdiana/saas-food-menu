import { Injectable } from '@nestjs/common';

import { ProductCategoryRepository } from '../../infrastructure/repositories/product-category.repository';

@Injectable()
export class AssignProductCategoryService {
  constructor(private productCategoryRepository: ProductCategoryRepository) {}

  async assign(productId: string, categoryIds: string[]) {
    await this.productCategoryRepository.hardDeleteByProductId(productId);

    const productCategories = categoryIds.map((categoryId) =>
      this.productCategoryRepository.create({
        productId,
        categoryId,
      }),
    );

    await this.productCategoryRepository.bulkSave(productCategories);
  }
}
