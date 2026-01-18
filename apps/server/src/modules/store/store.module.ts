import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreEntity } from './domain/entities/store.entity';

import { AuthorizationModule } from '../authorization/authorization.module';
import { CategoryModule } from '../category/category.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

import { StoreRepository } from './infrastructure/repositories/store.repository';
import { PublicStoreRepository } from './infrastructure/repositories/public-store.repository';

import { StoreController } from './interface/controllers/store.controller';

import { CreateStoreUseCase } from './application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from './application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from './application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from './application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from './application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from './application/use-case/update-store.use-case';
import { GetSelectStoreDataUseCase } from './application/use-case/get-select-store-data.use-case';

import { PublicStoreService } from './application/services/public-store.service';
import { AccessStoreService } from './application/services/access-store.service';

import { StorageService } from '@/shared/services/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), AuthorizationModule, CategoryModule, RecommendationModule],
  controllers: [StoreController],
  providers: [
    StoreRepository,
    PublicStoreRepository,

    CreateStoreUseCase,
    DeleteStoreUseCase,
    GetAllStoreUseCase,
    GetStoreByIdUseCase,
    GetStoreBySlugUseCase,
    UpdateStoreUseCase,
    GetSelectStoreDataUseCase,

    StorageService,
    PublicStoreService,
    AccessStoreService,
  ],
  exports: [GetStoreByIdUseCase, PublicStoreService, AccessStoreService],
})
export class StoreModule {}
