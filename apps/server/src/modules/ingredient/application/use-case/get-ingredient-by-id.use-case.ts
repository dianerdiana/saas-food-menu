import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { IngredientModel } from '../../domain/models/ingredient.model';

@Injectable()
export class GetIngredientByIdUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(id: string) {
    const ingredient = await this.ingredientRepository.findById(id);

    if (!ingredient) throw new NotFoundException('Ingredient not found');

    return new IngredientModel(ingredient);
  }
}
