import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { UpdateProductDto } from '@/modules/product/application/dtos/update-product.dto';
import { GetProductByIdUseCase } from '@/modules/product/application/use-cases/get-product-by-id.use-case';
import { UpdateProductUseCase } from '@/modules/product/application/use-cases/update-product.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateProductDash {
  constructor(
    private getProductByIdUseCase: GetProductByIdUseCase,
    private updateProductUseCase: UpdateProductUseCase,
  ) {}

  async execute(id: string, dto: UpdateProductDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const canManageProduct = ability.can(Action.Manage, Subject.Product);
    const productStoreId = canManageProduct && dto.storeId ? dto.storeId : user.storeId;
    const product = await this.getProductByIdUseCase.execute(id);

    if (ability.can(Action.Update, product)) {
      return await this.updateProductUseCase.execute(
        { ...dto, storeId: productStoreId },
        id,
        user.userId,
        user.storeId,
      );
    }

    throw new ForbiddenException("You're not allowed to update product");
  }
}
