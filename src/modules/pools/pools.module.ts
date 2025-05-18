import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { ApiModule } from '../api/api.module';
import { PoolsApiUniswapService } from './pools-api/pools-api-uniswap.service';
import { PoolsApiEtherService } from './pools-api/pools-api-ether.service';
import { POOLS_API } from './pools-api/pools-api-provider.token';
import { PoolsApiUniswapNormalizer } from './pools-api/pools-api-uniswap.normalizer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './pool.entity';

@Module({
  imports: [ApiModule, TypeOrmModule.forFeature([Pool])],
  providers: [
    PoolsService,
    PoolsApiUniswapService,
    PoolsApiEtherService,
    PoolsApiUniswapNormalizer,
    {
      provide: POOLS_API,
      useClass:
        process.env.API_SOURCE === 'uniswap'
          ? PoolsApiUniswapService
          : PoolsApiEtherService,
    },
  ],
  exports: [PoolsService, POOLS_API],
})
export class PoolsModule {}
