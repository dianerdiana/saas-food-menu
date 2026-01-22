import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../domain/entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  create(role: Partial<RoleEntity>) {
    return this.repository.create(role);
  }

  async bulkSave(roles: RoleEntity[]) {
    return await this.repository.createQueryBuilder().insert().into(RoleEntity).values(roles).execute();
  }

  findByName(name: string) {
    return this.repository.findOneBy({ name });
  }
}
