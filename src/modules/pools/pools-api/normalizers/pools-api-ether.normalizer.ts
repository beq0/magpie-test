import { Injectable } from '@nestjs/common';
import { PoolDetailsDto } from '../dto/pool-details.dto';
import { PoolDetailsEtherDto } from '../dto/pool-details-ether.dto';
import { EtherApiService } from '../../../api/ether-api.service';

@Injectable()
export class PoolsApiEtherNormalizer {
  constructor(private readonly etherApiService: EtherApiService) {}

  public async normalizePoolDetails(
    poolsDetails: PoolDetailsEtherDto,
  ): Promise<PoolDetailsDto[]> {
    const poolDetails: PoolDetailsDto[] = [];

    for (const event of poolsDetails.events) {
      const { args, createdAtTimestamp } = event;
      const token0 = args[0];
      const token1 = args[1];
      const fee = args[2];
      const poolAddress = args[4];

      const poolContract = this.etherApiService.getPoolContract(poolAddress);
      // @ts-ignore
      const slot0 = await poolContract.slot0();
      // @ts-ignore
      const liquidity = await poolContract.liquidity();

      poolDetails.push({
        id: poolAddress,
        token0: {
          id: token0,
        },
        token1: {
          id: token1,
        },
        feeTier: fee.toString(),
        createdAtTimestamp: createdAtTimestamp.toString(),
        liquidity: liquidity.toString(),
        sqrtPrice: slot0.sqrtPriceX96.toString(),
      });
    }

    return poolDetails;
  }
}
