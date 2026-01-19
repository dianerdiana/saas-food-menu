import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';
import { StoreModule } from '../store/store.module';

import { CategoryEntity } from './domain/entities/category.entity';

import { CategoryRepository } from './infrastructure/repositories/category.repository';

import { CategoryController } from './interface/controllers/category.controller';

import { StorageService } from '@/shared/services/storage.service';

import { InitializeDefaultCategoryService } from './application/services/initialize-default-category.service';
import { ValidateCategoriesService } from './application/services/validate-categories.service';

import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from './application/use-cases/delete-category.use-case';
import { GetAllCategoryUseCase } from './application/use-cases/get-all-category.use-case';
import { GetCategoryByIdUseCase } from './application/use-cases/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { GetCategoryBySlugUseCase } from './application/use-cases/get-category-by-slug.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), AuthorizationModule],
  controllers: [],
  providers: [
    StorageService,
    CategoryRepository,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllCategoryUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    GetCategoryBySlugUseCase,
    InitializeDefaultCategoryService,
    ValidateCategoriesService,
  ],
  exports: [InitializeDefaultCategoryService, ValidateCategoriesService],
})
export class CategoryModule {}
