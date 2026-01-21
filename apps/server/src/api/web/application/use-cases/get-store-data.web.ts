import { Injectable } from '@nestjs/common';

import { GetCategoryListUseCase } from '@/modules/category/application/use-cases/get-category-list.use-case';
import { GetRecommendationListUseCase } from '@/modules/recommendation/application/use-cases/get-recommendation-list.use-case';
import { GetStoreBySlugUseCase } from '@/modules/store/application/use-cases/get-store-by-slug.use-case';
import { GetProductByIdsUseCase } from '@/modules/product/application/use-cases/get-product-by-ids.use-case';
import { GetProductRecommendationListByIdsService } from '@/modules/product-recommendation/application/services/get-product-recommendation-list-by-ids.service';

import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { GetProductCategoryListByIdsService } from '@/modules/product-category/application/services/get-product-category-list-by-ids.service';

@Injectable()
export class GetStoreDataWeb {
  constructor(
    private getStoreBySlugUseCase: GetStoreBySlugUseCase,
    private getCategoryListUseCase: GetCategoryListUseCase,
    private getRecommendationListUseCase: GetRecommendationListUseCase,
    private getProductRecommendationService: GetProductRecommendationListByIdsService,
    private getProductByIdsUseCase: GetProductByIdsUseCase,
    private getProductCategoryService: GetProductCategoryListByIdsService,
  ) {}

  async execute(slug: string) {
    const pagination = { limit: 100, page: 1 } as PaginationDto;

    const store = await this.getStoreBySlugUseCase.execute(slug);

    const [[categories], [recommendations]] = await Promise.all([
      this.getCategoryListUseCase.execute(pagination, store.id),
      this.getRecommendationListUseCase.execute(pagination, store.id),
    ]);

    const recommendationIds = [...new Set(recommendations.map((r) => r.id))];
    const productRecommendations = await this.getProductRecommendationService.execute(recommendationIds);

    const productIds = [...new Set(productRecommendations.map((pr) => pr.productId))];
    const [products, productCategories] = await Promise.all([
      this.getProductByIdsUseCase.execute(productIds),
      this.getProductCategoryService.execute(undefined, productIds),
    ]);

    // OPTIMASI: Grouping productCategories berdasarkan productId (O(N))
    const productCategoryGroupMap = new Map<string, any[]>();
    productCategories.forEach((pc) => {
      const existing = productCategoryGroupMap.get(pc.productId) || [];
      productCategoryGroupMap.set(pc.productId, [...existing, pc.categoryId]);
    });

    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    // OPTIMASI: Mapping product dengan kategori yang sudah di-group
    const productMap = new Map(
      products.map((product) => {
        const catIds = productCategoryGroupMap.get(product.id) || [];
        return [
          product.id,
          {
            ...product,
            categories: catIds.map((id) => categoryMap.get(id)).filter(Boolean),
          },
        ];
      }),
    );

    return {
      store,
      categories,
      recommendations: recommendations.map((rec) => ({
        ...rec,
        products: productRecommendations
          .filter((pr) => pr.recommendationId === rec.id)
          .map((pr) => productMap.get(pr.productId))
          .filter(Boolean), // Penting: Hindari undefined di array
      })),
    };
  }
}
