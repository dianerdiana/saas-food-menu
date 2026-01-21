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

  findByProductId(productId: string) {
    return this.repository.createQueryBuilder('productCategory').where('product_id=:productId', { productId }).getOne();
  }

  findMany(categoryId?: string, productId?: string) {
    const query = this.repository.createQueryBuilder('pr');

    if (categoryId) query.andWhere('pr.category_id=:categoryId', { categoryId });
    if (productId) query.andWhere('pr.product_id=:productId', { productId });

    return query.getMany();
  }

  findManyByIds(categoryIds?: string[], productIds?: string[]) {
    const query = this.repository.createQueryBuilder('pr');

    if (categoryIds && categoryIds.length) {
      query.andWhere('pr.category_id IN (:...categoryIds)', { categoryIds });
    }

    if (productIds) {
      query.andWhere('pr.product_id IN (:...productIds)', { productIds });
    }

    return query.getMany();
  }

  async hardDeleteByProductId(productId: string) {
    return await this.repository.delete({ productId });
  }
}
