import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private storageService: StorageService,
  ) {}

  async execute(id: string, authUser: AuthUser) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category is not found');

    category.deletedBy = authUser.userId;
    await this.categoryRepository.save(category);

    if (category.image) {
      await this.storageService.deleteFile(category.image);
    }

    const updateResult = await this.categoryRepository.deleteById(category.id);

    return updateResult.affected && true;
  }
}
