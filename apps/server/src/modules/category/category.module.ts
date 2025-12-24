import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { CategoryEntity } from './domain/entities/category.entity';

// Repository
import { CategoryRepository } from './infrastructure/repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryRepository],
})
export class CategoryModule {}
