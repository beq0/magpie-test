import {Inject, Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";
import {POOLS_API} from "../pools/pools-api/pools-api-provider.token";
import {PoolsApiService} from "../pools/pools-api/pools-api.service.interface";
import {PoolsService} from "../pools/pools.service";
import {TICKS_API} from "../ticks/ticks-api/ticks-api-provider.token";
import {TicksApiService} from "../ticks/ticks-api/ticks-api.service.interface";

@Injectable()
export class TasksService {
    constructor(@Inject(POOLS_API) private readonly poolsApiService: PoolsApiService,
                @Inject(TICKS_API) private readonly ticksApiService: TicksApiService,
                private readonly poolsService: PoolsService,) {
    }
    @Cron(CronExpression.EVERY_5_SECONDS)
    async synchronizePools() {
        console.log('Synchronizing pools started');

        const poolsDetails = await this.poolsApiService.getPoolsDetails();
        console.log('POOLEBI', poolsDetails);

        const poolIds = poolsDetails.map(pool => pool.id);
        const ticks = await this.ticksApiService.getTicksByPoolIds(poolIds);
        console.log('TICKEBI', ticks);

        console.log('Synchronizing pools finished');
    }
}
