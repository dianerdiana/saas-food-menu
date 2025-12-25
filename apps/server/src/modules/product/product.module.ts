// NestJs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { ProductEntity } from './domain/entities/product.entity';

// Repository
import { ProductRepository } from './infrastructure/repositories/product.repository';

// Controller
import { ProductController } from './interface/controllers/product.controller';

// Use Case
import { CreateProductUseCase } from './application/use-case/create-product.use-case';
import { DeleteProductUseCase } from './application/use-case/delete-product.use-case';
import { GetAllProductUseCase } from './application/use-case/get-all-product.use-case';
import { GetProductByIdUseCase } from './application/use-case/get-product-by-id.use-case';
import { UpdateProductUseCase } from './application/use-case/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    DeleteProductUseCase,
    GetAllProductUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductModule {}
