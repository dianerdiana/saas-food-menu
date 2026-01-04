import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
