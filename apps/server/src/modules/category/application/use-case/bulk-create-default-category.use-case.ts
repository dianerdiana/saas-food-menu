import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../../infrastructure/repositories/category.repository';

const defaultCategories = [
  { name: 'All Menu', slug: '', image: 'categories/all-menu.png', storeId: '' },
  { name: 'Chicken', slug: '', image: 'categories/chicken.png', storeId: '' },
  { name: 'Desert', slug: '', image: 'categories/desert.png', storeId: '' },
  { name: 'Drink', slug: '', image: 'categories/drink.png', storeId: '' },
  { name: 'Ramen', slug: '', image: 'categories/ramen.png', storeId: '' },
];

@Injectable()
export class BulkCreateDefaultCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(storeId: string) {
    const categories = defaultCategories.map((category) =>
      this.categoryRepository.create({
        ...category,
        storeId,
        slug: category.name,
      }),
    );

    return await this.categoryRepository.bulkSave(categories);
  }
}
