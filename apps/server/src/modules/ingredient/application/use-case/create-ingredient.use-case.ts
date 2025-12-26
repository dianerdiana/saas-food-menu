import { Injectable } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { AuthUser } from '@/shared/types/auth-user.type';
import { CreateIngredientDto } from '../dtos/create-ingredient.dto';
import { IngredientModel } from '../../domain/models/ingredient.model';

@Injectable()
export class CreateIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(createIngredientDto: CreateIngredientDto, authUser: AuthUser) {
    const ingredient = this.ingredientRepository.create({ ...createIngredientDto, createdBy: authUser.userId });
    await this.ingredientRepository.save(ingredient);

    return new IngredientModel(ingredient);
  }
}
