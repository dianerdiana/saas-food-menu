import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserRoleEntity } from '../../domain/entities/user-role.entity';
import { CreateUserRoleDto } from '../../application/dtos/create-user-role.dto';

@Injectable()
export class UserRoleRepository {
  constructor(
    @InjectRepository(UserRoleEntity)
    private repository: Repository<UserRoleEntity>,
  ) {}

  create(permission: CreateUserRoleDto) {
    return this.repository.create(permission);
  }

  async bulkSave(permissions: UserRoleEntity[]) {
    return await this.repository.createQueryBuilder().insert().into(UserRoleEntity).values(permissions).execute();
  }
}
