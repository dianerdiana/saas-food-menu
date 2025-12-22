import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(user: Partial<UserEntity>) {
    return this.repository.create(user);
  }

  async save(user: UserEntity) {
    return this.repository.save(user);
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findByUsernameForAuth(username: string) {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :username', { username })
      .orWhere('user.username = :username', { username })
      .getOne();
  }
}
