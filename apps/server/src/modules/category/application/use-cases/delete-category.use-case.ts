import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string, userId: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category is not found');

    category.deletedBy = userId;
    await this.categoryRepository.save(category);

    const updateResult = await this.categoryRepository.deleteById(category.id);

    return updateResult.affected && true;
  }
}
