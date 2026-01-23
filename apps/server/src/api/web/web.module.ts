import { Module } from '@nestjs/common';

import { WebtoreController } from './interface/controllers/store.controller';

import { StoreModule } from '@/modules/store/store.module';
import { CategoryModule } from '@/modules/category/category.module';
import { ProductModule } from '@/modules/product/product.module';
import { RecommendationModule } from '@/modules/recommendation/recommendation.module';
import { ProductCategoryModule } from '@/modules/product-category/product-category.module';
import { ProductRecommendationModule } from '@/modules/product-recommendation/product-recommendation.module';

import { GetStoreDataWeb } from './application/use-cases/get-store-data.web';
import { GetStoreProductWeb } from './application/use-cases/get-store-product.web';
import { GetStoreProductListWeb } from './application/use-cases/get-store-product-list.web';

@Module({
  imports: [
    StoreModule,
    CategoryModule,
    ProductModule,
    RecommendationModule,
    ProductCategoryModule,
    ProductRecommendationModule,
  ],
  controllers: [WebtoreController],
  providers: [GetStoreDataWeb, GetStoreProductWeb, GetStoreProductListWeb],
})
export class WebModule {}
