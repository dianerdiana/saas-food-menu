import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  create(category: Partial<CategoryEntity>) {
    return this.repository.create(category);
  }

  async save(category: CategoryEntity) {
    return this.repository.save(category);
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
