import { Module } from '@nestjs/common';

import { DashStoreController } from './interface/controllers/store.controller';
import { DashAuthController } from './interface/controllers/auth.controller';
import { DashCategoryController } from './interface/controllers/category.controller';
import { DashProductController } from './interface/controllers/product.controller';
import { DashRecommendationController } from './interface/controllers/recommendation.controller';

import { AuthModule } from '@/modules/auth/auth.module';
import { AuthorizationModule } from '@/modules/authorization/authorization.module';
import { StoreModule } from '@/modules/store/store.module';
import { CategoryModule } from '@/modules/category/category.module';
import { ProductModule } from '@/modules/product/product.module';
import { RecommendationModule } from '@/modules/recommendation/recommendation.module';
import { ProductCategoryModule } from '@/modules/product-category/product-category.module';
import { ProductRecommendationModule } from '@/modules/product-recommendation/product-recommendation.module';

import { StorageService } from '@/shared/services/storage.service';

// Store Providers
import { GetStoreListDash } from './application/use-cases/store/get-store-list.dash';
import { CreateStoreDash } from './application/use-cases/store/create-store.dash';
import { UpdateStoreDash } from './application/use-cases/store/update-store.dash';
import { DeleteStoreDash } from './application/use-cases/store/delete-store.dash';
import { GetStoreCategoriesDash } from './application/use-cases/store/get-store-categories.dash';
import { GetStoreProductsDash } from './application/use-cases/store/get-store-products.dash';

// Category Providers
import { GetCategoryListDash } from './application/use-cases/category/get-category-list.dash';
import { CreateCategoryDash } from './application/use-cases/category/create-category.dash';
import { UpdateCategoryDash } from './application/use-cases/category/update-category.dash';
import { DeleteCategoryDash } from './application/use-cases/category/delete-category.dash';

// Product Providers
import { GetProductListDash } from './application/use-cases/product/get-product-list.dash';
import { CreateProductDash } from './application/use-cases/product/create-product.dash';
import { UpdateProductDash } from './application/use-cases/product/update-product.dash';
import { DeleteProductDash } from './application/use-cases/product/delete-product.dash';
import { GetProductByIdDash } from './application/use-cases/product/get-product-by-id.dash';
import { GetProductBySlugDash } from './application/use-cases/product/get-product-by-slug.dash';

// Recommendation Providers
import { GetRecommendationListDash } from './application/use-cases/recommendation/get-recommendation-list.dash';
import { CreateRecommendationDash } from './application/use-cases/recommendation/create-recommendation.dash';
import { UpdateRecommendationDash } from './application/use-cases/recommendation/update-recommendation.dash';
import { DeleteRecommendationDash } from './application/use-cases/recommendation/delete-recommendation.dash';
import { GetRecommendationByIdDash } from './application/use-cases/recommendation/get-recommendation-by-id.dash';

@Module({
  imports: [
    AuthModule,
    AuthorizationModule,
    StoreModule,
    CategoryModule,
    ProductModule,
    RecommendationModule,
    ProductCategoryModule,
    ProductRecommendationModule,
  ],
  controllers: [
    DashAuthController,
    DashStoreController,
    DashCategoryController,
    DashProductController,
    DashRecommendationController,
  ],
  providers: [
    StorageService,

    // Store
    GetStoreListDash,
    GetStoreCategoriesDash,
    CreateStoreDash,
    UpdateStoreDash,
    DeleteStoreDash,
    GetStoreProductsDash,

    // Category
    GetCategoryListDash,
    CreateCategoryDash,
    UpdateCategoryDash,
    DeleteCategoryDash,

    // Product
    GetProductListDash,
    CreateProductDash,
    UpdateProductDash,
    DeleteProductDash,
    GetProductByIdDash,
    GetProductBySlugDash,

    // Recommendation
    GetRecommendationListDash,
    CreateRecommendationDash,
    UpdateRecommendationDash,
    DeleteRecommendationDash,
    GetRecommendationByIdDash,
  ],
})
export class DashModule {}
