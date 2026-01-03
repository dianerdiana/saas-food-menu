import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

  async bulkSave(categories: CategoryEntity[]) {
    return await this.repository.createQueryBuilder().insert().into(CategoryEntity).values(categories).execute();
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }

  async findAll({ limit, skip, search }: PaginationDto) {
    return this.repository.findAndCount({
      take: limit,
      skip,
      where: {
        name: ILike(`%${search}%`),
        slug: ILike(`%${search}$`),
      },
    });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }
}
