import {Module} from '@nestjs/common';
import {TicksService} from './ticks.service';
import {TICKS_API} from "./ticks-api/ticks-api-provider.token";
import {TicksApiUniswapService} from "./ticks-api/ticks-api-uniswap.service";
import {TicksApiEtherService} from "./ticks-api/ticks-api-ether.service";
import {TicksApiUniswapNormalizer} from "./ticks-api/ticks-api-uniswap.normalizer";
import {ApiModule} from "../api/api.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tick} from "./tick.entity";

@Module({
  imports: [ApiModule, TypeOrmModule.forFeature([Tick])],
  providers: [TicksService,
    TicksApiUniswapService,
    TicksApiEtherService,
    TicksApiUniswapNormalizer,
    {
      provide: TICKS_API,
      useClass:
          process.env.API_SOURCE === 'uniswap'
              ? TicksApiUniswapService
              : TicksApiEtherService,
    },],
  exports: [TicksService, TICKS_API]
})
export class TicksModule {}
