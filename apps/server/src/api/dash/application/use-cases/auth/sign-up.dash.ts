import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';

import { GetRoleByNameUseCase } from '@/modules/role/application/use-cases/get-role-by-name.use-case';
import { AssignUserRoleService } from '@/modules/user-role/application/services/assign-user-role.service';
import { CreateUserUseCase } from '@/modules/user/application/use-cases/create-user.use-case';
import { CreateStoreUseCase } from '@/modules/store/application/use-cases/create-store.use-case';
import { CreateStoreDto } from '@/modules/store/application/dtos/create-store.dto';

@Injectable()
export class SignUpDash {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getRoleByNameUseCase: GetRoleByNameUseCase,
    private assignUserRoleService: AssignUserRoleService,
    private createStoreUseCase: CreateStoreUseCase,
  ) {}

  async execute(dto: CreateUserDto) {
    const newUser = await this.createUserUseCase.create(dto);

    const [user, role] = await Promise.all([
      await this.createUserUseCase.save(newUser),
      await this.getRoleByNameUseCase.execute('OWNER'),
    ]);

    const storeName = `${user.firstName}-${Date.now()}-store`;
    const storeDto = { name: storeName, slug: storeName, userId: user.id } as CreateStoreDto;
    const store = this.createStoreUseCase.create(storeDto, user.id);

    await this.assignUserRoleService.assign(user.id, role.id);
    await this.createStoreUseCase.save(store, 1);

    return user;
  }
}
