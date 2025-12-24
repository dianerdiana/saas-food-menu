import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private repository: Repository<SubscriptionEntity>,
  ) {}

  create(subscription: any) {
    return this.repository.create(subscription);
  }

  async save(subscription: SubscriptionEntity) {
    return this.repository.save(subscription);
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findAll({ limit, skip }: PaginationDto) {
    return this.repository.findAndCount({
      take: limit,
      skip,
    });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }
}
