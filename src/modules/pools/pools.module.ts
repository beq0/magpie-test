import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { ApiModule } from '../api/api.module';
import { PoolsApiUniswapService } from './pools-api/pools-api-uniswap.service';
import { PoolsApiEtherService } from './pools-api/pools-api-ether.service';
import { POOLS_API } from './pools-api/pools-api-provider.token';
import { PoolsApiUniswapNormalizer } from './pools-api/pools-api-uniswap.normalizer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './pool.entity';
import { PoolsApiEtherNormalizer } from './pools-api/pools-api-ether.normalizer';
import { ApiSource } from '../api/api-source.enum';
import { TicksApiUniswapService } from '../ticks/ticks-api/ticks-api-uniswap.service';
import { TicksApiEtherService } from '../ticks/ticks-api/ticks-api-ether.service';

const apiSource = process.env.API_SOURCE;
let PoolsApiImplementation;

if (apiSource === ApiSource.UNISWAP) {
  PoolsApiImplementation = PoolsApiUniswapService;
} else if (apiSource === ApiSource.ETHER) {
  PoolsApiImplementation = PoolsApiEtherService;
} else {
  console.warn(
    `Unknown API_SOURCE "${apiSource}", defaulting to Uniswap for Pools API.`,
  );
  PoolsApiImplementation = PoolsApiUniswapService;
}

@Module({
  imports: [ApiModule, TypeOrmModule.forFeature([Pool])],
  providers: [
    PoolsService,
    PoolsApiUniswapService,
    PoolsApiEtherService,
    PoolsApiUniswapNormalizer,
    PoolsApiEtherNormalizer,
    {
      provide: POOLS_API,
      useClass: PoolsApiImplementation,
    },
  ],
  exports: [PoolsService, POOLS_API],
})
export class PoolsModule {}
