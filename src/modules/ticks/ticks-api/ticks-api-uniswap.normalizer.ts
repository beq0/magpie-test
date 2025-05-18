import { Injectable } from '@nestjs/common';
import { TickDetailsUniswapDto } from './dto/ticks-details-uniswap.dto';
import { TickDetailsDto } from './dto/ticks-details.dto';

@Injectable()
export class TicksApiUniswapNormalizer {
  public normalizeTickDetails(
    tickDetails: TickDetailsUniswapDto[],
  ): TickDetailsDto[] {
    return tickDetails.map((tick) => {
      return {
        id: tick.id,
        poolId: tick.poolAddress,
        liquidityGross: tick.liquidityGross,
        liquidityNet: tick.liquidityNet,
        price0: tick.price0,
        price1: tick.price1,
      };
    });
  }
}
