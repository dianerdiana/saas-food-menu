import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreEntity } from './domain/entities/store.entity';

import { StoreRepository } from './infrastructure/repositories/store.repository';

import { CreateStoreUseCase } from './application/use-cases/create-store.use-case';
import { DeleteStoreUseCase } from './application/use-cases/delete-store.use-case';
import { GetStoreByIdUseCase } from './application/use-cases/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from './application/use-cases/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from './application/use-cases/update-store.use-case';
import { GetStoreByIdsUseCase } from './application/use-cases/get-store-by-ids.use-case';
import { GetStoreListUseCase } from './application/use-cases/get-store-list.use-case';

import { StorageService } from '@/shared/services/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [],
  providers: [
    StoreRepository,

    GetStoreByIdUseCase,
    GetStoreByIdsUseCase,
    GetStoreBySlugUseCase,
    GetStoreListUseCase,

    CreateStoreUseCase,
    DeleteStoreUseCase,
    UpdateStoreUseCase,

    StorageService,
  ],
  exports: [
    StoreRepository,

    GetStoreByIdUseCase,
    GetStoreByIdsUseCase,
    GetStoreBySlugUseCase,
    GetStoreListUseCase,

    CreateStoreUseCase,
    DeleteStoreUseCase,
    UpdateStoreUseCase,
  ],
})
export class StoreModule {}
