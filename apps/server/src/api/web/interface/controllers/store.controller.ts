import { Controller, Get, Param } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { GetStoreDataWeb } from '../../application/use-cases/get-store-data.web';
import { GetStoreProductWeb } from '../../application/use-cases/get-store-product.web';
import { GetStoreProductListWeb } from '../../application/use-cases/get-store-product-list.web';

import { Public } from '@/shared/decorators/public.decorator';
import { StoreResponse } from '@/shared/responses/store.response';
import { CategoryResponse, CategoryWithProductListResponse } from '@/shared/responses/category.response';
import { RecommendationResponse } from '@/shared/responses/recommendation.response';
import { ProductWithCategoryListResponse } from '@/shared/responses/product.response';

@Public()
@Controller('web/stores')
export class WebtoreController {
  constructor(
    private getStoreDataWeb: GetStoreDataWeb,
    private getStoreProductWeb: GetStoreProductWeb,
    private getStoreProductListWeb: GetStoreProductListWeb,
  ) {}

  @Get(':slug')
  async getStoreData(@Param('slug') slug: string) {
    const result = await this.getStoreDataWeb.execute(slug);

    return {
      store: new StoreResponse(result.store),
      categories: result.categories.map((category) => new CategoryResponse(category)),
      recommendations: result.recommendations.map((rec) => {
        const plainRecommendation = instanceToPlain(new RecommendationResponse(rec));

        return {
          ...plainRecommendation,
          products: rec.products
            .filter((product) => product !== undefined)
            .map((product) => new ProductWithCategoryListResponse(product)),
        };
      }),
    };
  }

  @Get(':slug/products')
  async getStoreProductList(@Param('slug') slug: string) {
    const result = await this.getStoreProductListWeb.execute(slug);

    return {
      store: new StoreResponse(result.store),
      categories: result.categories.map((category) => new CategoryResponse(category)),
      categoryProducts: result.categoryProducts.map((cp) => new CategoryWithProductListResponse(cp)),
    };
  }

  @Get(':slug/products/:productSlug')
  async getStoreProduct(@Param() param: Record<'slug' | 'productSlug', string>) {
    const result = await this.getStoreProductWeb.execute(param.slug, param.productSlug);

    return {
      store: new StoreResponse(result.store),
      product: new ProductWithCategoryListResponse(result.product),
    };
  }
}
