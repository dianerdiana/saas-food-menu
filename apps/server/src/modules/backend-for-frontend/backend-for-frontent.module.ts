import { Module } from '@nestjs/common';

import { StoreModule } from '../store/store.module';

import { HomeController } from './interface/controllers/home.controller';

import { HomeMapper } from './interface/mapper/home.mapper';
@Module({
  imports: [StoreModule],
  controllers: [HomeController],
  providers: [HomeMapper],
})
export class BackendForFrontendModule {}
