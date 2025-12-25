import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto, authUser: AuthUser) {}
}
