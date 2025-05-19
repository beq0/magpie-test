import { Injectable } from '@nestjs/common';
import { PoolDetailsDto } from '../dto/pool-details.dto';
import { PoolDetailsUniswapDto } from '../dto/pool-details-uniswap.dto';

@Injectable()
export class PoolsApiUniswapNormalizer {
  public normalizePoolDetails(
    poolDetails: PoolDetailsUniswapDto[],
  ): PoolDetailsDto[] {
    return poolDetails.map((pool) => ({
      id: pool.id,
      token0: pool.token0,
      token1: pool.token1,
      feeTier: pool.feeTier,
      sqrtPrice: pool.sqrtPrice,
      liquidity: pool.liquidity,
      createdAtTimestamp: pool.createdAtTimestamp,
    }));
  }
}
