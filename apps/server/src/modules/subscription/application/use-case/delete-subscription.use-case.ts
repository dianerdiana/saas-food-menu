import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/repositories/subscription.repository';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(id: string, authUser: AuthUser) {
    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) throw new NotFoundException('Subscription is not found');
    const updateResult = await this.subscriptionRepository.deleteById(subscription.id);
    return updateResult.affected && true;
  }
}
