import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { StoreEntity } from './domain/entities/store.entity';

// Repository
import { StoreRepository } from './infrastructure/repositories/store.repository';

// Controller
import { StoreController } from './interface/controllers/store.controller';

// Use Case
import { CreateStoreUseCase } from './application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from './application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from './application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from './application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from './application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from './application/use-case/update-store.use-case';
import { StorageService } from '@/shared/services/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
  providers: [
    StoreRepository,
    CreateStoreUseCase,
    DeleteStoreUseCase,
    GetAllStoreUseCase,
    GetStoreByIdUseCase,
    GetStoreBySlugUseCase,
    UpdateStoreUseCase,
    StorageService,
  ],
  exports: [GetStoreByIdUseCase],
})
export class StoreModule {}
