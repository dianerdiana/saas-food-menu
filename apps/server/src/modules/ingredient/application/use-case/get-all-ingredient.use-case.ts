import { Injectable } from '@nestjs/common';
import { IngredientRepository } from '../../infrastructure/repositories/ingredient.repository';
import { IngredientModel } from '../../domain/models/ingredient.model';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetAllIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.ingredientRepository.findAll(paginationDto);
    const ingredients = data.map((ingredient) => new IngredientModel(ingredient));

    const totalPages = Math.ceil(count / limit);

    return {
      ingredients,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
