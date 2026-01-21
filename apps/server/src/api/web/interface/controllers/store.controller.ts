import { Controller, Get, Param } from '@nestjs/common';

import { GetStoreDataWeb } from '../../application/use-cases/get-store-data.web';

import { Public } from '@/shared/decorators/public.decorator';
import { StoreResponse } from '@/shared/responses/store.response';
import { CategoryResponse } from '@/shared/responses/category.response';
import { RecommendationWithProductListResponse } from '@/shared/responses/recommendation.response';
import { ProductWithCategoryListResponse } from '@/shared/responses/product.response';

@Public()
@Controller('web/stores')
export class WebtoreController {
  constructor(private getStoreDataWeb: GetStoreDataWeb) {}

  @Get(':slug')
  async getStoreData(@Param('slug') slug: string) {
    const result = await this.getStoreDataWeb.execute(slug);

    return {
      store: new StoreResponse(result.store),
      categories: result.categories.map((category) => new CategoryResponse(category)),
      recommendations: result.recommendations.map((rec) => {
        return new RecommendationWithProductListResponse({
          ...rec,
          products: rec.products
            .filter((product) => product !== undefined)
            .map((product) => new ProductWithCategoryListResponse(product)),
        });
      }),
    };
  }
}
