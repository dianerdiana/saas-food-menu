import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

@Injectable()
export class GetCategoryBySlugUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(slug: string) {
    const category = await this.categoryRepository.findBySlug(slug);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
