import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { IngredientEntity } from './domain/entities/ingredient.entity';

// Repository
import { IngredientRepository } from './infrastructure/repositories/ingredient.repository';

// Controller
import { IngredientController } from './interface/controllers/ingredient.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  controllers: [IngredientController],
  providers: [IngredientRepository],
})
export class IngredientModule {}
