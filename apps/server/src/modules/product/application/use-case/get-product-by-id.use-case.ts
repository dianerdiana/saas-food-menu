import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, authUser: AuthUser, ability: AppAbility) {
    let product: ProductEntity | null = null;

    if (ability.can(Action.Manage, Subject.Product)) {
      product = await this.productRepository.findById(id);
    } else if (ability.can(Action.Read, Subject.Product)) {
      product = await this.productRepository.findByIdAndStoreId(id, authUser.storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access products');
    }

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
