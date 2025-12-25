import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { IngredientModel } from '../../domain/models/ingredient.model';
import { UpdateIngredientDto } from '../dtos/update-ingredient.dto';

@Injectable()
export class UpdateIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(updateIngredientDto: UpdateIngredientDto, ingredientId: string) {
    const {} = updateIngredientDto;
    const ingredient = await this.ingredientRepository.findById(ingredientId);

    if (!ingredient) throw new NotFoundException('Ingredient is not found');

    await this.ingredientRepository.save(ingredient);
    return new IngredientModel(ingredient);
  }
}
