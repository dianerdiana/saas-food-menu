import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

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

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }

  async findAll({ limit, skip }: PaginationDto) {
    return this.repository.findAndCount({
      take: limit,
      skip,
    });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }
}
