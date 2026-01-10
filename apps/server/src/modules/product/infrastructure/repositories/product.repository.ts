import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { ProductEntity } from '../../domain/entities/product.entity';

import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  create(product: Partial<ProductEntity>) {
    return this.repository.create(product);
  }

  async save(product: ProductEntity) {
    return this.repository.save(product);
  }

  async findByIdAndStoreId(id: string, storeId: string) {
    return this.repository.findOneBy({ id, storeId });
  }

  async findBySlugAndStoreId(slug: string, storeId: string) {
    return this.repository.findOneBy({ slug, storeId });
  }

  async findAllByStoreId({ limit, skip, search }: PaginationDto, storeId: string) {
    const query = this.repository.createQueryBuilder('product').leftJoinAndSelect('product.store', 'store');

    if (search) {
      query.andWhere('(product.name ILIKE :search or product.slug ILIKE :search)', { search: `%${search}%` });
    }

    query.andWhere('product.store_id=:store_id', { store_id: storeId }).take(limit).skip(skip);

    return query.getManyAndCount();
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }

  async findAll({ limit, skip, search }: PaginationDto) {
    const query = this.repository.createQueryBuilder('product').leftJoinAndSelect('product.store', 'store');

    if (search) {
      query.andWhere('(product.name ILIKE :search or product.slug ILIKE :search)', { search: `%${search}%` });
    }

    query.take(limit).skip(skip);

    return query.getManyAndCount();
  }

  async countAllOwned(storeId: string) {
    return this.repository.countBy({ storeId });
  }

  async countByIdsAndStoreId(ids: string[], storeId: string) {
    return this.repository.countBy({ id: In(ids), storeId });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }
}
