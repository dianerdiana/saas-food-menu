import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryModel } from '../../domain/models/category.model';
import { AuthUser } from '@/shared/types/auth-user.type';
import { CATEGORY_STATUS } from '@/shared/constants/category-status.constant';
import { ImageRequiredDto } from '@/shared/dtos/image.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto & ImageRequiredDto, authUser: AuthUser) {
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      storeId: authUser.storeId,
      createdBy: authUser.userId,
      status: CATEGORY_STATUS.active,
    });

    await this.categoryRepository.save(category);

    return new CategoryModel(category);
  }
}
