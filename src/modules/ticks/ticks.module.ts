import { Module } from '@nestjs/common';
import { TicksService } from './ticks.service';
import { TICKS_API } from './ticks-api/ticks-api-provider.token';
import { TicksApiUniswapService } from './ticks-api/ticks-api-uniswap.service';
import { TicksApiEtherService } from './ticks-api/ticks-api-ether.service';
import { TicksApiUniswapNormalizer } from './ticks-api/ticks-api-uniswap.normalizer';
import { ApiModule } from '../api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tick } from './tick.entity';
import { ApiSource } from '../api/api-source.enum';

const apiSource = process.env.API_SOURCE;
let TicksApiImplementation;

if (apiSource === ApiSource.UNISWAP) {
  TicksApiImplementation = TicksApiUniswapService;
} else if (apiSource === ApiSource.ETHER) {
  TicksApiImplementation = TicksApiEtherService;
} else {
  console.warn(
    `Unknown API_SOURCE "${apiSource}", defaulting to Uniswap for Ticks API.`,
  );
  TicksApiImplementation = TicksApiUniswapService;
}

@Module({
  imports: [ApiModule, TypeOrmModule.forFeature([Tick])],
  providers: [
    TicksService,
    TicksApiUniswapService,
    TicksApiEtherService,
    TicksApiUniswapNormalizer,
    {
      provide: TICKS_API,
      useClass: TicksApiImplementation,
    },
  ],
  exports: [TicksService, TICKS_API],
})
export class TicksModule {}
