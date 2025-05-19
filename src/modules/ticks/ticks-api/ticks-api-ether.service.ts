import { Injectable } from '@nestjs/common';
import { TicksApiService } from './ticks-api.service.interface';
import { TickDetailsDto } from './dto/ticks-details.dto';
import { EtherApiService } from '../../api/ether-api.service';

@Injectable()
export class TicksApiEtherService implements TicksApiService {
  constructor(private readonly etherApiService: EtherApiService) {}

  public async getTicksByPoolIds(poolIds: string[]): Promise<TickDetailsDto[]> {
    const ticks: TickDetailsDto[] = [];

    for (const poolId of poolIds) {
      // tick min and max indexes
      const minTick = BigInt(-887272);
      const maxTick = BigInt(887272);

      const poolContract = this.etherApiService.getPoolContract(poolId);
      // @ts-ignore
      const tickSpacing = await poolContract.tickSpacing();

      for (let tick = minTick; tick <= maxTick; tick += tickSpacing) {
        if (ticks.length >= 5) {
          break;
        }
        try {
          // @ts-ignore
          const tickData = await this.etherApiService
            .getPoolContract(poolId)
            .ticks(tick);

          ticks.push({
            id: `${poolId}_${tick.toString()}`,
            poolId,
            liquidityGross: tickData.liquidityGross.toString(),
            liquidityNet: tickData.liquidityNet.toString(),
          });
        } catch (err) {
          console.error(
            `Failed fetching tick ${tick} for pool ${poolId}:`,
            err,
          );
        }
      }
    }

    return ticks;
  }
}
