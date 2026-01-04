import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { StorageService } from '@/shared/services/storage.service';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private storageService: StorageService,
  ) {}

  async execute(
    updateCategoryDto: UpdateCategoryDto & { image?: string | null },
    id: string,
    authUser: AuthUser,
    ability: AppAbility,
  ) {
    const { name, slug, description, image } = updateCategoryDto;

    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category is not found');

    if (!ability.can(Action.Update, category)) {
      throw new ForbiddenException('You are not allowed to update category');
    }

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
