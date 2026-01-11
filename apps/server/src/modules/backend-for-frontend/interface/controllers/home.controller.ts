import { BffStoreService } from '@/modules/store/application/services/bff-store.service';
import { Public } from '@/shared/decorators/public.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { HomeMapper } from '../mapper/home.mapper';

@Controller('bff/home')
@Public()
export class HomeController {
  constructor(
    private bffStoreService: BffStoreService,
    private homeMapper: HomeMapper,
  ) {}

  @Get(':storeSlug')
  async getHomeData(@Param('storeSlug') storeSlug: string) {
    const rows = await this.bffStoreService.findBySlug(storeSlug, ['recommendation']);

    return this.homeMapper.mapHomeData(rows);
  }
}
