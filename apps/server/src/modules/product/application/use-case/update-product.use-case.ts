import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { ProductModel } from '../../domain/models/product.model';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(updateProductDto: UpdateProductDto, productId: string) {
    const {} = updateProductDto;
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundException('Product is not found');

    await this.productRepository.save(product);
    return new ProductModel(product);
  }
}
