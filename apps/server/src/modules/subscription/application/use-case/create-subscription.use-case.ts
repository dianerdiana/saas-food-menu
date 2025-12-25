import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/repositories/subscription.repository';
import { CreateSubscriptionDto } from '../dtos/create-subscription.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute(createSubscriptionDto: CreateSubscriptionDto, authUser: AuthUser) {}
}
