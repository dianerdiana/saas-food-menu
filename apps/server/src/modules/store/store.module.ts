import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { StoreEntity } from './domain/entities/store.entity';

// Repository
import { StoreRepository } from './infrastructure/repositories/store.repository';

// Controller
import { StoreController } from './interface/controllers/store.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
  providers: [StoreRepository],
})
export class StoreModule {}
