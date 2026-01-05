import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationResponse } from '../responses/reccommendation.response';

import { CreateRecommendationDto } from '../../application/dtos/create-recommendation.dto';
import { UpdateRecommendationDto } from '../../application/dtos/update-recommendation.dto';

import { CreateRecommendationUseCase } from '../../application/use-case/create-recommendation.use-case';
import { DeleteRecommendationUseCase } from '../../application/use-case/delete-recommendation.use-case';
import { GetAllRecommendationUseCase } from '../../application/use-case/get-all-recommendation.use-case';
import { GetRecommendationByIdUseCase } from '../../application/use-case/get-recommendation-by-id.use-case';
import { UpdateRecommendationUseCase } from '../../application/use-case/update-recommendation.use-case';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';

@Controller('categories')
export class RecommendationController {
  constructor(
    private createRecommendationUseCase: CreateRecommendationUseCase,
    private deleteRecommendationUseCase: DeleteRecommendationUseCase,
    private getAllRecommendationUseCase: GetAllRecommendationUseCase,
    private getRecommendationByIdUseCase: GetRecommendationByIdUseCase,
    private updateRecommendationUseCase: UpdateRecommendationUseCase,
    private storageService: StorageService,
  ) {}

  @UseGuards(PoliciesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createRecommendation(
    @Body() createRecommendationDto: CreateRecommendationDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.categories);
    }

    const result = await this.createRecommendationUseCase.execute(createRecommendationDto, authUser, ability);

    return {
      message: 'Successfuly created recommendation',
      data: new RecommendationResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @Get()
  async getAllRecommendation(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getAllRecommendationUseCase.execute(paginationDto, authUser, ability);
    return {
      data: result.categories.map((recommendation) => new RecommendationResponse(recommendation)),
      meta: result.meta,
    };
  }

  @UseGuards(PoliciesGuard)
  @Get('id/:id')
  async getRecommendationById(
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getRecommendationByIdUseCase.execute(id, authUser, ability);
    return new RecommendationResponse(result);
  }

  @UseGuards(PoliciesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateRecommendation(
    @Body() updateRecommendationDto: UpdateRecommendationDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.categories);
    }

    const result = await this.updateRecommendationUseCase.execute(updateRecommendationDto, id, authUser, ability);

    return {
      message: 'Successfuly updated recommendation',
      data: new RecommendationResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @Delete(':id')
  async deleteRecommendation(
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.deleteRecommendationUseCase.execute(id, authUser, ability);

    return {
      message: 'Successfuly deleted recommendation',
      data: result,
    };
  }
}
