import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { IngredientModel } from '../../domain/models/ingredient.model';

@Injectable()
export class GetIngredientBySlugUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(slug: string) {
    const ingredient = await this.ingredientRepository.findBySlug(slug);

    if (!ingredient) throw new NotFoundException('Ingredient not found');

    return new IngredientModel(ingredient);
  }
}
