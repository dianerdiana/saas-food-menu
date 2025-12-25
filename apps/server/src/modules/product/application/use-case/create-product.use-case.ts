import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}
}
