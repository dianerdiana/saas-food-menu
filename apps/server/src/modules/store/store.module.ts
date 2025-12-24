import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { StoreEntity } from './domain/entities/store.entity';

// Repository
import { StoreRepository } from './infrastructure/repositories/store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  providers: [StoreRepository],
})
export class StoreModule {}
