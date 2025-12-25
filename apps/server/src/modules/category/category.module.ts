// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { CategoryEntity } from './domain/entities/category.entity';

// Repository
import { CategoryRepository } from './infrastructure/repositories/category.repository';

// Controller
import { CategoryController } from './interface/controllers/category.controller';

// Use Case
import { CreateCategoryUseCase } from './application/use-case/create-category.use-case';
import { DeleteCategoryUseCase } from './application/use-case/delete-category.use-case';
import { GetAllCategoryUseCase } from './application/use-case/get-all-category.use-case';
import { GetCategoryByIdUseCase } from './application/use-case/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from './application/use-case/update-category.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    CategoryRepository,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllCategoryUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
  ],
})
export class CategoryModule {}
