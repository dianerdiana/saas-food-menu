import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/repositories/subscription.repository';
import { SubscriptionModel } from '../../domain/models/subscription.model';

@Injectable()
export class GetSubscriptionByIdUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(id: string) {
    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) throw new NotFoundException('Subscription not found');

    return new SubscriptionModel(subscription);
  }
}
