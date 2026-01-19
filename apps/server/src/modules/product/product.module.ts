// NestJs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from './domain/entities/product.entity';
import { ProductRepository } from './infrastructure/repositories/product.repository';

import { StorageService } from '@/shared/services/storage.service';

import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';
import { GetProductListUseCase } from './application/use-cases/get-product-list.use-case';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.use-case';
import { GetProductBySlugUseCase } from './application/use-cases/get-product-by-slug.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [],
  providers: [
    StorageService,

    ProductRepository,
    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductListUseCase,
    GetProductByIdUseCase,
    GetProductBySlugUseCase,
    UpdateProductUseCase,
  ],
  exports: [
    ProductRepository,

    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductListUseCase,
    GetProductByIdUseCase,
    GetProductBySlugUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductModule {}
