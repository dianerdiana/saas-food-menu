import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/repositories/subscription.repository';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}
}
