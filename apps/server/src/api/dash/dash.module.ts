import { Module } from '@nestjs/common';

import { StoreController } from './interface/controllers/store.controller';
import { AuthController } from './interface/controllers/auth.controller';
import { CategoryController } from './interface/controllers/category.controller';
import { ProductController } from './interface/controllers/product.controller';

import { AuthModule } from '@/modules/auth/auth.module';
import { AuthorizationModule } from '@/modules/authorization/authorization.module';
import { StoreModule } from '@/modules/store/store.module';
import { CategoryModule } from '@/modules/category/category.module';
import { ProductModule } from '@/modules/product/product.module';
import { RecommendationModule } from '@/modules/recommendation/recommendation.module';

import { StorageService } from '@/shared/services/storage.service';

// Store Providers
import { GetStoreListDash } from './application/use-cases/store/get-store-list.dash';
import { CreateStoreDash } from './application/use-cases/store/create-store.dash';
import { UpdateStoreDash } from './application/use-cases/store/update-store.dash';
import { DeleteStoreDash } from './application/use-cases/store/delete-store.dash';
import { GetStoreCategoriesDash } from './application/use-cases/store/get-store-categories.dash';

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

@Module({
  imports: [AuthModule, AuthorizationModule, StoreModule, CategoryModule, ProductModule, RecommendationModule],
  controllers: [AuthController, StoreController, CategoryController, ProductController],
  providers: [
    StorageService,

    // Store
    GetStoreListDash,
    GetStoreCategoriesDash,
    CreateStoreDash,
    UpdateStoreDash,
    DeleteStoreDash,

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
  ],
})
export class DashModule {}
