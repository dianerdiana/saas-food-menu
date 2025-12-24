import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { ProductEntity } from './domain/entities/product.entity';

// Repository
import { ProductRepository } from './infrastructure/repositories/product.repository';

// Controller
import { ProductController } from './interface/controllers/product.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
