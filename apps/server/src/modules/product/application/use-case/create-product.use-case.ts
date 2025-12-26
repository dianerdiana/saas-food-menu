import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductModel } from '../../domain/models/product.model';
import { AuthUser } from '@/shared/types/auth-user.type';
import { PRODUCT_STATUS } from '@/shared/constants/product-status.constant';

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto & { image: string }, authUser: AuthUser) {
    const product = this.productRepository.create({
      ...createProductDto,
      storeId: authUser.storeId,
      createdBy: authUser.userId,
      status: PRODUCT_STATUS.active,
    });
    await this.productRepository.save(product);

    return new ProductModel(product);
  }
}
