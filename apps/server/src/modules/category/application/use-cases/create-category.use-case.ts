import { BadRequestException, Injectable } from '@nestjs/common';

import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { CATEGORY_STATUS } from '@/shared/constants/category-status.constant';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  create(dto: CreateCategoryDto & ImageOptionalDto, userId: string) {
    const category = this.categoryRepository.create({
      ...dto,
      createdBy: userId,
      status: CATEGORY_STATUS.active,
    });

    return category;
  }

  async save(category: CategoryEntity, maxCategories: number | null) {
    const existingCategorySlug = await this.categoryRepository.findBySlug(category.slug);
    if (existingCategorySlug) throw new BadRequestException("Category's slug is already exist");

    const ownedCategoryCount = await this.categoryRepository.countAllOwned(category.storeId);

    if (maxCategories !== null && ownedCategoryCount >= maxCategories) {
      throw new BadRequestException('You already reached category limit');
    }

    await this.categoryRepository.save(category);

    return category;
  }
}
