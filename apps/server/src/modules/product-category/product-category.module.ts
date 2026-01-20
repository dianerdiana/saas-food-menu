import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryEntity } from './domain/entities/product-category.entity';

import { AssignProductCategoryService } from './application/services/assign-product-category.service';

import { ProductCategoryRepository } from './infrastructure/repositories/product-category.repository';
import { GetProductCategoryByProductIdService } from './application/services/get-category-by-product-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  providers: [ProductCategoryRepository, AssignProductCategoryService, GetProductCategoryByProductIdService],
  exports: [AssignProductCategoryService, GetProductCategoryByProductIdService],
})
export class ProductCategoryModule {}
