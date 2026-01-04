import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private storageService: StorageService,
  ) {}

  async execute(
    updateCategoryDto: UpdateCategoryDto & { image?: string | null },
    categoryId: string,
    authUser: AuthUser,
  ) {
    const { name, slug, description, image } = updateCategoryDto;

    const category = await this.categoryRepository.findById(categoryId);
    if (!category) throw new NotFoundException('Category is not found');

    category.name = name;
    category.slug = slug;
    category.updatedBy = authUser.userId;
    if (description) category.description = description;
    if (image) {
      if (category.image) await this.storageService.deleteFile(category.image);
      category.image = image;
    }

    await this.categoryRepository.save(category);
    return category;
  }
}
