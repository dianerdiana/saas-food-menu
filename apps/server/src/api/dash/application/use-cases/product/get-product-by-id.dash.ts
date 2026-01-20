import { Injectable } from '@nestjs/common';

import { GetCategoryByIdUseCase } from '@/modules/category/application/use-cases/get-category-by-id.use-case';
import { GetProductCategoryByProductIdService } from '@/modules/product-category/application/services/get-category-by-product-id.service';
import { GetProductByIdUseCase } from '@/modules/product/application/use-cases/get-product-by-id.use-case';

@Injectable()
export class GetProductByIdDash {
  constructor(
    private getProductByIdUseCase: GetProductByIdUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private getProductCategory: GetProductCategoryByProductIdService,
  ) {}

  async execute(productId: string) {
    const product = await this.getProductByIdUseCase.execute(productId);
    const productCategory = await this.getProductCategory.execute(productId);
    const category = await this.getCategoryByIdUseCase.execute(productCategory.categoryId);

    return {
      ...product,
      category,
    };
  }
}
