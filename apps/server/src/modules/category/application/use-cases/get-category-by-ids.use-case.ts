import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

@Injectable()
export class GetCategoryByIdsUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(ids: string[]) {
    const categories = await this.categoryRepository.findByIds(ids);

    return categories;
  }
}
