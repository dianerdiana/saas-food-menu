// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateSubscriptionDto } from '../../application/dtos/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../application/dtos/update-subscription.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Use-cases
import { CreateSubscriptionUseCase } from '../../application/use-case/create-subscription.use-case';
import { DeleteSubscriptionUseCase } from '../../application/use-case/delete-subscription.use-case';
import { GetAllSubscriptionUseCase } from '../../application/use-case/get-all-subscription.use-case';
import { GetSubscriptionByIdUseCase } from '../../application/use-case/get-subscription-by-id.use-case';
import { UpdateSubscriptionUseCase } from '../../application/use-case/update-subscription.use-case';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private createSubscriptionUseCase: CreateSubscriptionUseCase,
    private deleteSubscriptionUseCase: DeleteSubscriptionUseCase,
    private getAllSubscriptionUseCase: GetAllSubscriptionUseCase,
    private getSubscriptionByIdUseCase: GetSubscriptionByIdUseCase,
    private updateSubscriptionUseCase: UpdateSubscriptionUseCase,
  ) {}

  @Post()
  async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto, @GetAuthUser() authUser: AuthUser) {
    return await this.createSubscriptionUseCase.execute(createSubscriptionDto, authUser);
  }

  @Get()
  async getAllSubscription(@Query() paginationDto: PaginationDto) {
    return await this.getAllSubscriptionUseCase.execute(paginationDto);
  }

  @Get('id/:id')
  async getSubscriptionById(@Param('id') id: string) {
    return await this.getSubscriptionByIdUseCase.execute(id);
  }

  @Put(':id')
  async updateSubscription(
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    return await this.updateSubscriptionUseCase.execute(updateSubscriptionDto, id, authUser);
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.deleteSubscriptionUseCase.execute(id, authUser);
  }
}
