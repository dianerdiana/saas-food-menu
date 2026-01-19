import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { DeleteProductUseCase } from '@/modules/product/application/use-cases/delete-product.use-case';
import { GetProductByIdUseCase } from '@/modules/product/application/use-cases/get-product-by-id.use-case';

import { Action } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteProductDash {
  constructor(
    private deleteProductUseCase: DeleteProductUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  async execute(id: string, user: AuthUser, ability: AppAbility) {
    const product = await this.getProductByIdUseCase.execute(id);

    if (ability.can(Action.Delete, product)) {
      return await this.deleteProductUseCase.execute(id, user.userId);
    }

    throw new ForbiddenException("You're not allowed to delete product");
  }
}
