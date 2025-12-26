import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, authUser: AuthUser) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product is not found');

    product.deletedBy = authUser.userId;
    await this.productRepository.save(product);

    const updateResult = await this.productRepository.deleteById(product.id);

    return updateResult.affected && true;
  }
}
