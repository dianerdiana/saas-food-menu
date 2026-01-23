import { Injectable, NotFoundException } from '@nestjs/common';

import { GetCategoryListUseCase } from '@/modules/category/application/use-cases/get-category-list.use-case';
import { GetProductCategoryListByIdsService } from '@/modules/product-category/application/services/get-product-category-list-by-ids.service';
import { GetProductListUseCase } from '@/modules/product/application/use-cases/get-product-list.use-case';
import { GetStoreBySlugUseCase } from '@/modules/store/application/use-cases/get-store-by-slug.use-case';

import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetStoreProductListWeb {
  constructor(
    private getStoreBySlug: GetStoreBySlugUseCase,
    private getProductList: GetProductListUseCase,
    private getCategoryList: GetCategoryListUseCase,
    private getProductCategoryList: GetProductCategoryListByIdsService,
  ) {}

  async execute(storeSlug: string) {
    if (!storeSlug) throw new NotFoundException('Store is not defined');

    const pagination = { limit: 100, page: 1 } as PaginationDto;
    const store = await this.getStoreBySlug.execute(storeSlug);

    const [[products], [categories]] = await Promise.all([
      this.getProductList.execute(pagination, store.id),
      this.getCategoryList.execute(pagination, store.id),
    ]);

    const categoryIds = [...new Set(categories.map((cat) => cat.id))];

    const productMap = new Map(products.map((product) => [product.id, product]));
    const productCategoryMap = new Map<string, any[]>();

    if (categoryIds.length) {
      const productCategories = await this.getProductCategoryList.execute(categoryIds);

      productCategories.forEach((pc) => {
        const existing = productCategoryMap.get(pc.categoryId) || [];
        productCategoryMap.set(pc.categoryId, [...existing, pc.productId]);
      });
    }

    return {
      store,
      categories,
      categoryProducts: categories.map((category) => {
        const productIds = productCategoryMap.get(category.id) || [];

        return {
          ...category,
          products: productIds
            .map((id) => ({
              ...productMap.get(id),
              categories: [category],
            }))
            .filter((product) => product !== undefined)
            .filter(Boolean),
        };
      }),
    };
  }
}
