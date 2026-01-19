import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private storageService: StorageService,
  ) {}

  async execute(dto: UpdateCategoryDto & ImageOptionalDto, userId: string, categoryId: string) {
    const { name, slug, description, image } = dto;

    const category = await this.categoryRepository.findById(categoryId);
    if (!category) throw new NotFoundException('Category is not found');

    if (slug !== category.slug) {
      const existingCategorySlug = await this.categoryRepository.findBySlug(slug);
      if (existingCategorySlug) throw new BadRequestException("Category's slug is already exist");
    }

    category.name = name;
    category.slug = slug;

    if (description !== undefined) category.description = description;
    if (image) {
      if (category.image) await this.storageService.deleteFile(category.image);
      category.image = image;
    }

    category.updatedBy = userId;

    await this.categoryRepository.save(category);

    return category;
  }
}
