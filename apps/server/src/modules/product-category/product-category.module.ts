import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryEntity } from './domain/entities/product-category.entity';

import { AssignProductCategoryService } from './application/services/assign-product-category.service';

import { ProductCategoryRepository } from './infrastructure/repositories/product-category.repository';
import { GetProductCategoryByProductIdService } from './application/services/get-product-category-by-product-id.service';
import { DeleteProductCategoryByProductId } from './application/services/delete-product-category-by-product-id.service';
import { GetProductCategoryListByIdsService } from './application/services/get-product-category-list-by-ids.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  providers: [
    ProductCategoryRepository,
    AssignProductCategoryService,
    GetProductCategoryByProductIdService,
    DeleteProductCategoryByProductId,
    GetProductCategoryListByIdsService,
  ],
  exports: [
    AssignProductCategoryService,
    GetProductCategoryByProductIdService,
    DeleteProductCategoryByProductId,
    GetProductCategoryListByIdsService,
  ],
})
export class ProductCategoryModule {}
