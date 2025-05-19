import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { POOLS_API } from '../pools/pools-api/pools-api-provider.token';
import { PoolsApiService } from '../pools/pools-api/pools-api.service.interface';
import { PoolsService } from '../pools/pools.service';
import { TICKS_API } from '../ticks/ticks-api/ticks-api-provider.token';
import { TicksApiService } from '../ticks/ticks-api/ticks-api.service.interface';
import { TokensService } from '../tokens/tokens.service';
import { TicksService } from '../ticks/ticks.service';
import { LockService } from '../lock/lock.service';

@Injectable()
export class TasksService {
  private SYNCHRONIZE_POOLS_LOCK = 'synchronizePoolsLock';

  constructor(
    @Inject(POOLS_API) private readonly poolsApiService: PoolsApiService,
    @Inject(TICKS_API) private readonly ticksApiService: TicksApiService,
    private readonly tokensService: TokensService,
    private readonly ticksService: TicksService,
    private readonly poolsService: PoolsService,
    private readonly lockService: LockService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async synchronizePools() {
    if (!this.lockService.lock(this.SYNCHRONIZE_POOLS_LOCK)) {
      return;
    }

    try {
      console.log('Synchronizing pools started');

      const latestPoolTimestamp =
        await this.poolsService.getLatestPoolTimestamp();
      if (latestPoolTimestamp) {
        console.log('Latest pool timestamp:', latestPoolTimestamp);
      } else {
        console.log('No pools found, fetching from the beginning');
      }

      const poolsDetails =
        await this.poolsApiService.getPoolsDetails(latestPoolTimestamp);
      await this.poolsService.savePools(poolsDetails);

      const poolIds = poolsDetails.map((pool) => pool.id);
      const ticks = await this.ticksApiService.getTicksByPoolIds(poolIds);
      await this.ticksService.saveTicks(ticks);

      const tokens = poolsDetails.flatMap((pool) => {
        return [pool.token0, pool.token1];
      });
      await this.tokensService.saveTokens(tokens);
    } finally {
      console.log('Synchronizing pools finished');
      this.lockService.unLock(this.SYNCHRONIZE_POOLS_LOCK);
    }
  }
}
