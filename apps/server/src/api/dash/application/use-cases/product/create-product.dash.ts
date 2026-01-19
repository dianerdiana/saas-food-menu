import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { CreateProductDto } from '@/modules/product/application/dtos/create-product.dto';
import { CreateProductUseCase } from '@/modules/product/application/use-cases/create-product.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateProductDash {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async execute(dto: CreateProductDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const canManageProduct = ability.can(Action.Manage, Subject.Product);
    const maxProducts = canManageProduct ? null : 100;

    const product = this.createProductUseCase.create(dto, user.userId);

    if (ability.can(Action.Create, product)) {
      return await this.createProductUseCase.save(product, maxProducts);
    }

    throw new ForbiddenException("You're not allowed to create product");
  }
}
