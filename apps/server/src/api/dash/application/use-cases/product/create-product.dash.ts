import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { CreateProductDto } from '@/modules/product/application/dtos/create-product.dto';
import { CreateProductUseCase } from '@/modules/product/application/use-cases/create-product.use-case';
import { GetCategoryByIdUseCase } from '@/modules/category/application/use-cases/get-category-by-id.use-case';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { AuthUser } from '@/shared/types/auth-user.type';
import { AssignProductCategoryService } from '@/modules/product-category/application/services/assign-product-category.service';

@Injectable()
export class CreateProductDash {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private assignProductCategoryService: AssignProductCategoryService,
  ) {}

  async execute(dto: CreateProductDto & ImageOptionalDto, user: AuthUser, ability: AppAbility) {
    const canManageProduct = ability.can(Action.Manage, Subject.Product);
    const productStoreId = canManageProduct && dto.storeId ? dto.storeId : user.storeId;
    const maxProducts = canManageProduct ? null : 100;

    const product = this.createProductUseCase.create({ ...dto, storeId: productStoreId }, user.userId);

    if (ability.can(Action.Create, product)) {
      const category = await this.getCategoryByIdUseCase.execute(dto.categoryId);
      const newProduct = await this.createProductUseCase.save(product, maxProducts);
      await this.assignProductCategoryService.assign(newProduct.id, [category.id]);

      return newProduct;
    }

    throw new ForbiddenException("You're not allowed to create product");
  }
}
