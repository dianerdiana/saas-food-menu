import { Module } from '@nestjs/common';

import { StoreController } from './interface/controllers/store.controller';

import { GetStoreListLms } from './application/use-cases/store/get-store-list.lms';
import { CreateStoreLms } from './application/use-cases/store/create-store.lms';
import { UpdateStoreLms } from './application/use-cases/store/update-store.lms';
import { DeleteStoreLms } from './application/use-cases/store/delete-store.lms';

import { StoreModule } from '@/modules/store/store.module';
import { AuthorizationModule } from '@/modules/authorization/authorization.module';

import { StorageService } from '@/shared/services/storage.service';

@Module({
  imports: [StoreModule, AuthorizationModule],
  controllers: [StoreController],
  providers: [StorageService, GetStoreListLms, CreateStoreLms, UpdateStoreLms, DeleteStoreLms],
})
export class LMSModule {}
