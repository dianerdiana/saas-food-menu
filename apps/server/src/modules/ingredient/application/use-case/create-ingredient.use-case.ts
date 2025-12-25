import { Injectable } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';

@Injectable()
export class CreateIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}
}
