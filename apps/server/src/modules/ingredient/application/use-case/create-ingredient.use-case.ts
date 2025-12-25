import { Injectable } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { AuthUser } from '@/shared/types/auth-user.type';
import { CreateIngredientDto } from '../dtos/create-ingredient.dto';

@Injectable()
export class CreateIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(createIngredientDto: CreateIngredientDto, authUser: AuthUser) {}
}
