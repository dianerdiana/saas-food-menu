import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from './domain/entities/category.entity';
import { CategoryRepository } from './infrastructure/repositories/category.repository';

import { StorageService } from '@/shared/services/storage.service';

import { InitializeDefaultCategoryService } from './application/services/initialize-default-category.service';

import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from './application/use-cases/delete-category.use-case';
import { GetCategoryListUseCase } from './application/use-cases/get-category-list.use-case';
import { GetCategoryByIdUseCase } from './application/use-cases/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { GetCategoryBySlugUseCase } from './application/use-cases/get-category-by-slug.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [],
  providers: [
    StorageService,
    InitializeDefaultCategoryService,

    CategoryRepository,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryListUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    GetCategoryBySlugUseCase,
  ],
  exports: [
    InitializeDefaultCategoryService,

    CategoryRepository,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryListUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    GetCategoryBySlugUseCase,
  ],
})
export class CategoryModule {}
