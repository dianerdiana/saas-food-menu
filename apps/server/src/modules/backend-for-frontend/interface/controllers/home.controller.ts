import { PublicStoreService } from '@/modules/store/application/services/public-store.service';
import { Public } from '@/shared/decorators/public.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { HomeMapper } from '../mapper/home.mapper';

@Controller('bff/home')
@Public()
export class HomeController {
  constructor(
    private publicStoreService: PublicStoreService,
    private homeMapper: HomeMapper,
  ) {}

  @Get(':storeSlug')
  async getHomeData(@Param('storeSlug') storeSlug: string) {
    const rows = await this.publicStoreService.findBySlug(storeSlug, ['recommendation']);

    return this.homeMapper.mapHomeData(rows);
  }
}
