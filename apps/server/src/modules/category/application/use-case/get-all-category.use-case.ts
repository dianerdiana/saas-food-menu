import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { CategoryModel } from '../../domain/models/category.model';

@Injectable()
export class GetAllCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.categoryRepository.findAll(paginationDto);
    const categories = data.map((category) => new CategoryModel(category));

    const totalPages = Math.ceil(count / limit);

    return {
      categories,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
