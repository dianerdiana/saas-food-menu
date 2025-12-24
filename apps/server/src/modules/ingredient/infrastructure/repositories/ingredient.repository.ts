import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientEntity } from '../../domain/entities/ingredient.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class IngredientRepository {
  constructor(
    @InjectRepository(IngredientEntity)
    private repository: Repository<IngredientEntity>,
  ) {}

  create(ingredient: any) {
    return this.repository.create(ingredient);
  }

  async save(ingredient: IngredientEntity) {
    return this.repository.save(ingredient);
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
