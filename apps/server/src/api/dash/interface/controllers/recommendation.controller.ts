import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import {
  RecommendationResponse,
  RecommendationWithProductListResponse,
  RecommendationWithStoreResponse,
} from '../responses/recommendation.response';

import { GetRecommendationListDash } from '../../application/use-cases/recommendation/get-recommendation-list.dash';
import { CreateRecommendationDash } from '../../application/use-cases/recommendation/create-recommendation.dash';
import { UpdateRecommendationDash } from '../../application/use-cases/recommendation/update-recommendation.dash';
import { DeleteRecommendationDash } from '../../application/use-cases/recommendation/delete-recommendation.dash';
import { GetRecommendationByIdDash } from '../../application/use-cases/recommendation/get-recommendation-by-id.dash';

import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { CreateRecommendationDto } from '@/modules/recommendation/application/dtos/create-recommendation.dto';
import { UpdateRecommendationDto } from '@/modules/recommendation/application/dtos/update-recommendation.dto';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@UseGuards(PoliciesGuard)
@Controller('/dash/recommendations')
export class RecommendationController {
  constructor(
    private getRecommendationListDash: GetRecommendationListDash,
    private getRecommendationByIdDash: GetRecommendationByIdDash,

    private createRecommendationDash: CreateRecommendationDash,
    private updateRecommendationDash: UpdateRecommendationDash,

    private deleteRecommendationDash: DeleteRecommendationDash,
  ) {}

  @Get()
  async getRecommendationList(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getRecommendationListDash.execute(paginationDto, authUser, ability);

    return {
      data: result.recommendations.map((recommendation) => new RecommendationWithStoreResponse(recommendation)),
      meta: result.meta,
    };
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Recommendation))
  @Get(':id')
  async getRecommendationById(@Param('id') id: string) {
    const result = await this.getRecommendationByIdDash.execute(id);

    return new RecommendationWithProductListResponse(result);
  }

  @Post()
  async createRecommendation(
    @Body() dto: CreateRecommendationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.createRecommendationDash.execute(dto, authUser, ability);

    return {
      message: 'Successfuly created recommendation',
      data: new RecommendationResponse(result),
    };
  }

  @Put(':id')
  async updateRecommendation(
    @Param('id') id: string,
    @Body() dto: UpdateRecommendationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.updateRecommendationDash.execute(id, dto, authUser, ability);

    return {
      message: 'Successfuly created recommendation',
      data: new RecommendationResponse(result),
    };
  }

  @Delete(':id')
  async deleteRecommendation(
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.deleteRecommendationDash.execute(id, authUser, ability);
    return {
      message: 'Successfuly deleted recommendation',
      data: result,
    };
  }
}
