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

import { StoreResponse } from '../responses/store.response';
import { GetStoreListLms } from '../../application/use-cases/store/get-store-list.lms';
import { CreateStoreLms } from '../../application/use-cases/store/create-store.lms';
import { UpdateStoreLms } from '../../application/use-cases/store/update-store.lms';
import { DeleteStoreLms } from '../../application/use-cases/store/delete-store.lms';

import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { CreateStoreDto } from '@/modules/store/application/dtos/create-store.dto';
import { UpdateStoreDto } from '@/modules/store/application/dtos/update-store.dto';

import { GetStoreByIdUseCase } from '@/modules/store/application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from '@/modules/store/application/use-case/get-store-by-slug.use-case';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@UseGuards(PoliciesGuard)
@Controller('/lms/stores')
export class StoreController {
  constructor(
    private storageService: StorageService,

    private getStoreListLms: GetStoreListLms,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
    private getStoreBySlugUseCase: GetStoreBySlugUseCase,

    private createStoreLms: CreateStoreLms,
    private updateStoreLms: UpdateStoreLms,

    private deleteStoreLms: DeleteStoreLms,
  ) {}

  @Get()
  async getStoreList(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getStoreListLms.execute(paginationDto, authUser, ability);

    return {
      data: result.stores.map((store) => new StoreResponse(store)),
      meta: result.meta,
    };
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Store))
  @Get('id/:id')
  async getStoreById(@Param('id') id: string) {
    const result = await this.getStoreByIdUseCase.execute(id);
    return new StoreResponse(result);
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Store))
  @Get('slug/:slug')
  async getStoreBySlug(@Param('slug') slug: string) {
    const result = await this.getStoreBySlugUseCase.execute(slug);
    return new StoreResponse(result);
  }

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
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.stores);
    }

    const result = await this.createStoreLms.execute({ ...createStoreDto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created store',
      data: new StoreResponse(result),
    };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateStore(
    @Param('id') id: string,
    @Body() updateStore: UpdateStoreDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.stores);
    }

    const result = await this.updateStoreLms.execute(id, { ...updateStore, image: url }, authUser, ability);

    return {
      message: 'Successfuly created store',
      data: new StoreResponse(result),
    };
  }

  @Delete(':id')
  async deleteStore(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, @GetAbillity() ability: AppAbility) {
    const result = await this.deleteStoreLms.execute(id, authUser, ability);
    return {
      message: 'Successfuly deleted store',
      data: result,
    };
  }
}
