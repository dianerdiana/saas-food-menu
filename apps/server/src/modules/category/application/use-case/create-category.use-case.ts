import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto, authUser: AuthUser) {}
}
