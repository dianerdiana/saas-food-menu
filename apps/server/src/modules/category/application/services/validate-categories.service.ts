import { BadRequestException, Injectable } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

@Injectable()
export class ValidateCategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(categoryIds: string[], storeId: string) {
    const count = await this.categoryRepository.countByIdsAndStoreId(categoryIds, storeId);

    if (count !== categoryIds.length) {
      throw new BadRequestException('Categories are not valid');
    }
  }
}
