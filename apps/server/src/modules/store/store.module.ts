import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreEntity } from './domain/entities/store.entity';

import { AuthorizationModule } from '../authorization/authorization.module';
import { CategoryModule } from '../category/category.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

import { StoreRepository } from './infrastructure/repositories/store.repository';
import { BffStoreRepository } from './infrastructure/repositories/bff-store.repository';

import { StoreController } from './interface/controllers/store.controller';

import { CreateStoreUseCase } from './application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from './application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from './application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from './application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from './application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from './application/use-case/update-store.use-case';

import { StorageService } from '@/shared/services/storage.service';
import { BffStoreService } from './application/services/bff-store.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), AuthorizationModule, CategoryModule, RecommendationModule],
  controllers: [StoreController],
  providers: [
    StoreRepository,
    BffStoreRepository,

    CreateStoreUseCase,
    DeleteStoreUseCase,
    GetAllStoreUseCase,
    GetStoreByIdUseCase,
    GetStoreBySlugUseCase,
    UpdateStoreUseCase,

    StorageService,
    BffStoreService,
  ],
  exports: [GetStoreByIdUseCase, BffStoreService],
})
export class StoreModule {}
