import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { IngredientEntity } from './domain/entities/ingredient.entity';

// Repository
import { IngredientRepository } from './infrastructure/repositories/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  providers: [IngredientRepository],
})
export class IngredientModule {}
