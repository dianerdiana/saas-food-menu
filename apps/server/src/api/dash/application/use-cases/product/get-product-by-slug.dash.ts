import { Injectable } from '@nestjs/common';

import { GetCategoryByIdUseCase } from '@/modules/category/application/use-cases/get-category-by-id.use-case';
import { GetProductCategoryByProductIdService } from '@/modules/product-category/application/services/get-category-by-product-id.service';
import { GetProductBySlugUseCase } from '@/modules/product/application/use-cases/get-product-by-slug.use-case';

@Injectable()
export class GetProductBySlugDash {
  constructor(
    private getProductBySlugUseCase: GetProductBySlugUseCase,
    private getCategoryBySlugUseCase: GetCategoryByIdUseCase,
    private getProductCategory: GetProductCategoryByProductIdService,
  ) {}

  async execute(productSlug: string) {
    const product = await this.getProductBySlugUseCase.execute(productSlug);
    const productCategory = await this.getProductCategory.execute(product.id);
    const category = await this.getCategoryBySlugUseCase.execute(productCategory.categoryId);

    return {
      ...product,
      category,
    };
  }
}
