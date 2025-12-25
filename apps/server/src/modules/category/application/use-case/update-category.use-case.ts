import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CategoryModel } from '../../domain/models/category.model';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(updateCategoryDto: UpdateCategoryDto, categoryId: string, authUser: AuthUser) {
    const {} = updateCategoryDto;
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) throw new NotFoundException('Category is not found');

    await this.categoryRepository.save(category);
    return new CategoryModel(category);
  }
}
