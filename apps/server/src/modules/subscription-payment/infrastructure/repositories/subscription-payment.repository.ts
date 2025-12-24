import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPaymentEntity } from '../../domain/entities/subscription-payment.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class SubscriptionPaymentRepository {
  constructor(
    @InjectRepository(SubscriptionPaymentEntity)
    private repository: Repository<SubscriptionPaymentEntity>,
  ) {}

  create(subscriptionPayment: any) {
    return this.repository.create(subscriptionPayment);
  }

  async save(subscriptionPayment: SubscriptionPaymentEntity) {
    return this.repository.save(subscriptionPayment);
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
