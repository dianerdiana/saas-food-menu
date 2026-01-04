// NestJs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryModule } from '../product-category/product-category.module';
import { CategoryModule } from '../category/category.module';
import { AuthorizationModule } from '../authorization/authorization.module';

import { ProductEntity } from './domain/entities/product.entity';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { ProductController } from './interface/controllers/product.controller';

import { StorageService } from '@/shared/services/storage.service';

import { CreateProductUseCase } from './application/use-case/create-product.use-case';
import { DeleteProductUseCase } from './application/use-case/delete-product.use-case';
import { GetAllProductUseCase } from './application/use-case/get-all-product.use-case';
import { GetProductByIdUseCase } from './application/use-case/get-product-by-id.use-case';
import { GetProductBySlugUseCase } from './application/use-case/get-product-by-slug.use-case';
import { UpdateProductUseCase } from './application/use-case/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ProductCategoryModule, CategoryModule, AuthorizationModule],
  controllers: [ProductController],
  providers: [
    StorageService,
    ProductRepository,
    CreateProductUseCase,
    DeleteProductUseCase,
    GetAllProductUseCase,
    GetProductByIdUseCase,
    GetProductBySlugUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductModule {}
