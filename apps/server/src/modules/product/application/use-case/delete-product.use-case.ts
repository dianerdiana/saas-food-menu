import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/access-control.enum';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product is not found');

    if (!ability.can(Action.Delete, product)) {
      throw new ForbiddenException('You are not allowed to delete this product');
    }

    product.deletedBy = authUser.userId;
    await this.productRepository.save(product);

    const updateResult = await this.productRepository.deleteById(product.id);

    return updateResult.affected && true;
  }
}
