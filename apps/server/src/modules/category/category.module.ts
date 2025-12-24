import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { CategoryEntity } from './domain/entities/category.entity';

// Repository
import { CategoryRepository } from './infrastructure/repositories/category.repository';

// Controller
import { CategoryController } from './interface/controllers/category.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryRepository],
})
export class CategoryModule {}
