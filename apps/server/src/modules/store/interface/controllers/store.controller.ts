import {
  BadRequestException,
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

import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';

import { CreateStoreUseCase } from '../../application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from '../../application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from '../../application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from '../../application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from '../../application/use-case/update-store.use-case';

import { StoreResponse } from '../responses/store.response';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { Action, Subject } from '@/shared/enums/access-control.enum';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';

@Controller('stores')
export class StoreController {
  constructor(
    private createStoreUseCase: CreateStoreUseCase,
    private deleteStoreUseCase: DeleteStoreUseCase,
    private getAllStoreUseCase: GetAllStoreUseCase,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
    private getStoreBySlugUseCase: GetStoreBySlugUseCase,
    private updateStoreUseCase: UpdateStoreUseCase,
    private storageService: StorageService,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.Store))
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.createStoreUseCase.execute({ ...createStoreDto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created store',
      data: new StoreResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Store))
  @Get()
  async getAllStore(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getAllStoreUseCase.execute(paginationDto, authUser, ability);

    return {
      data: result.stores.map((store) => new StoreResponse(store)),
      meta: result.meta,
    };
  }

  @Get('id/:id')
  async getStoreById(@Param('id') id: string) {
    const result = await this.getStoreByIdUseCase.execute(id);
    return new StoreResponse(result);
  }

  @Get('slug/:slug')
  async getStoreBySlug(@Param('slug') slug: string) {
    const result = await this.getStoreBySlugUseCase.execute(slug);
    return new StoreResponse(result);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Update, Subject.Store))
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateStore(
    @Body() updateStoreDto: UpdateStoreDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.updateStoreUseCase.execute({ ...updateStoreDto, image: url }, id, authUser, ability);
    return {
      message: 'Successfuly updated store',
      data: new StoreResponse(result),
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, Subject.Store))
  @Delete(':id')
  async deleteStore(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.deleteStoreUseCase.execute(id, authUser, ability);
    return {
      message: 'Successfuly deleted store',
      data: result,
    };
  }
}
