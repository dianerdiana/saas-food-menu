import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

import { CATEGORY_STATUS } from '@/shared/constants/category-status.constant';

const defaultCategories = [
  {
    name: 'Chicken',
    slug: 'chicken',
    image: 'categories/default/chicken.png',
    storeId: '',
    status: CATEGORY_STATUS.active,
  },
  {
    name: 'Desert',
    slug: 'desert',
    image: 'categories/default/desert.png',
    storeId: '',
    status: CATEGORY_STATUS.active,
  },
  { name: 'Drink', slug: 'drink', image: 'categories/default/drink.png', storeId: '', status: CATEGORY_STATUS.active },
  { name: 'Ramen', slug: 'ramen', image: 'categories/default/ramen.png', storeId: '', status: CATEGORY_STATUS.active },
];

@Injectable()
export class InitializeDefaultCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async initialize(storeId: string) {
    const categories = defaultCategories.map((category) =>
      this.categoryRepository.create({
        ...category,
        storeId,
      }),
    );

    return await this.categoryRepository.bulkSave(categories);
  }
}
