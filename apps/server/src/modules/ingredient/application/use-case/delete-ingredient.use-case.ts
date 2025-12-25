import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteIngredientUseCase {
  constructor(private storeRepository: IngredientRepository) {}

  async execute(id: string, authUser: AuthUser) {
    const store = await this.storeRepository.findById(id);

    if (!store) throw new NotFoundException('Ingredient is not found');
    const updateResult = await this.storeRepository.deleteById(store.id);
    return updateResult.affected && true;
  }
}
