// NestJs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { IngredientEntity } from './domain/entities/ingredient.entity';

// Repository
import { IngredientRepository } from './infrastructure/repositories/ingredient.repository';

// Controller
import { IngredientController } from './interface/controllers/ingredient.controller';

// Use Case
import { CreateIngredientUseCase } from './application/use-case/create-ingredient.use-case';
import { DeleteIngredientUseCase } from './application/use-case/delete-ingredient.use-case';
import { GetAllIngredientUseCase } from './application/use-case/get-all-ingredient.use-case';
import { GetIngredientByIdUseCase } from './application/use-case/get-ingredient-by-id.use-case';
import { UpdateIngredientUseCase } from './application/use-case/update-ingredient.use-case';
import { GetIngredientBySlugUseCase } from './application/use-case/get-ingredient-by-slug.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  controllers: [IngredientController],
  providers: [
    IngredientRepository,
    CreateIngredientUseCase,
    DeleteIngredientUseCase,
    GetAllIngredientUseCase,
    GetIngredientByIdUseCase,
    GetIngredientBySlugUseCase,
    UpdateIngredientUseCase,
  ],
})
export class IngredientModule {}
