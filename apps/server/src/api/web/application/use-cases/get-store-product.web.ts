import { Injectable, NotFoundException } from '@nestjs/common';

import { GetProductCategoryListByIdsService } from '@/modules/product-category/application/services/get-product-category-list-by-ids.service';
import { GetProductBySlugUseCase } from '@/modules/product/application/use-cases/get-product-by-slug.use-case';
import { GetStoreBySlugUseCase } from '@/modules/store/application/use-cases/get-store-by-slug.use-case';
import { GetCategoryByIdsUseCase } from '@/modules/category/application/use-cases/get-category-by-ids.use-case';

@Injectable()
export class GetStoreProductWeb {
  constructor(
    private getStoreBySlug: GetStoreBySlugUseCase,
    private getProductBySlug: GetProductBySlugUseCase,
    private getProductCategory: GetProductCategoryListByIdsService,
    private getCategoryList: GetCategoryByIdsUseCase,
  ) {}

  async execute(storeSlug: string, productSlug: string) {
    if (!storeSlug || !productSlug) throw new NotFoundException('Product is not found');

    const store = await this.getStoreBySlug.execute(storeSlug);
    const product = await this.getProductBySlug.execute(productSlug);
    const productCategories = await this.getProductCategory.execute(undefined, [product.id]);
    const categories = await this.getCategoryList.execute(productCategories.map((pc) => pc.categoryId));

    return { store, product: { ...product, categories } };
  }
}
