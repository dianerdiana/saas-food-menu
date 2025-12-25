import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/repositories/subscription.repository';
import { SubscriptionModel } from '../../domain/models/subscription.model';
import { UpdateSubscriptionDto } from '../dtos/update-subscription.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(updateSubscriptionDto: UpdateSubscriptionDto, subscriptionId: string, authUser: AuthUser) {
    const {} = updateSubscriptionDto;
    const subscription = await this.subscriptionRepository.findById(subscriptionId);

    if (!subscription) throw new NotFoundException('Subscription is not found');

    await this.subscriptionRepository.save(subscription);
    return new SubscriptionModel(subscription);
  }
}
