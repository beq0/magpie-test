import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PoolsService } from './modules/pools/pools.service';
import { POOLS_API } from './modules/pools/pools-api/pools-api-provider.token';
import { PoolsApiService } from './modules/pools/pools-api/pools-api.service.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(POOLS_API) private readonly poolsApiService: PoolsApiService,
    private readonly poolsService: PoolsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pools')
  async getPools() {
    return this.poolsApiService.getPoolsDetails();
  }
}
