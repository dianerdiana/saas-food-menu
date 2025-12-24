import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { ProductEntity } from './domain/entities/product.entity';

// Repository
import { ProductRepository } from './infrastructure/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductRepository],
})
export class ProductModule {}
