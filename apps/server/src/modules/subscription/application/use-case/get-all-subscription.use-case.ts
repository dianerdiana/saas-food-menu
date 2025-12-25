import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/repositories/subscription.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { SubscriptionModel } from '../../domain/models/subscription.model';

@Injectable()
export class GetAllSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.subscriptionRepository.findAll(paginationDto);
    const subscriptions = data.map((subscription) => new SubscriptionModel(subscription));

    const totalPages = Math.ceil(count / limit);

    return {
      subscriptions,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
