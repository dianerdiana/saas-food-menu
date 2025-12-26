import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CategoryModel } from '../../domain/models/category.model';

@Injectable()
export class GetCategoryBySlugUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(slug: string) {
    const category = await this.categoryRepository.findBySlug(slug);

    if (!category) throw new NotFoundException('Category not found');

    return new CategoryModel(category);
  }
}
