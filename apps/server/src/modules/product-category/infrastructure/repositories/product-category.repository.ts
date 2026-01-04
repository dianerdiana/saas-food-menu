import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductCategoryEntity } from '../../domain/entities/product-category.entity';

@Injectable()
export class ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private repository: Repository<ProductCategoryEntity>,
  ) {}

  create(productCategory: Partial<ProductCategoryEntity>) {
    return this.repository.create(productCategory);
  }

  async bulkSave(productCategories: ProductCategoryEntity[]) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(ProductCategoryEntity)
      .values(productCategories)
      .returning(['id'])
      .execute();
  }

  async hardDeleteByProductId(productId: string) {
    return await this.repository.delete({ productId });
  }
}
