import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';

import { CategoryEntity } from './domain/entities/category.entity';

import { CategoryRepository } from './infrastructure/repositories/category.repository';

import { CategoryController } from './interface/controllers/category.controller';

import { StorageService } from '@/shared/services/storage.service';

import { CreateCategoryUseCase } from './application/use-case/create-category.use-case';
import { DeleteCategoryUseCase } from './application/use-case/delete-category.use-case';
import { GetAllCategoryUseCase } from './application/use-case/get-all-category.use-case';
import { GetCategoryByIdUseCase } from './application/use-case/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from './application/use-case/update-category.use-case';
import { GetCategoryBySlugUseCase } from './application/use-case/get-category-by-slug.use-case';
import { BulkCreateDefaultCategoryUseCase } from './application/use-case/bulk-create-default-category.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), AuthorizationModule],
  controllers: [CategoryController],
  providers: [
    StorageService,
    CategoryRepository,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllCategoryUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    GetCategoryBySlugUseCase,
    BulkCreateDefaultCategoryUseCase,
  ],
  exports: [BulkCreateDefaultCategoryUseCase],
})
export class CategoryModule {}
