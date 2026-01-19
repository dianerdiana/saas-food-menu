import { Module } from '@nestjs/common';

import { StoreController } from './interface/controllers/store.controller';
import { AuthController } from './interface/controllers/auth.controller';

import { GetStoreListLms } from './application/use-cases/store/get-store-list.lms';
import { CreateStoreLms } from './application/use-cases/store/create-store.lms';
import { UpdateStoreLms } from './application/use-cases/store/update-store.lms';
import { DeleteStoreLms } from './application/use-cases/store/delete-store.lms';

import { AuthModule } from '@/modules/auth/auth.module';
import { AuthorizationModule } from '@/modules/authorization/authorization.module';
import { StoreModule } from '@/modules/store/store.module';

import { StorageService } from '@/shared/services/storage.service';

@Module({
  imports: [AuthModule, AuthorizationModule, StoreModule],
  controllers: [AuthController, StoreController],
  providers: [StorageService, GetStoreListLms, CreateStoreLms, UpdateStoreLms, DeleteStoreLms],
})
export class LMSModule {}
