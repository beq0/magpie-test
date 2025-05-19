import { PoolDetailsDto } from './dto/pool-details.dto';

import { Injectable } from '@nestjs/common';
import { PoolsApiService } from './pools-api.service.interface';
import { EtherApiService } from '../../api/ether-api.service';
import { PoolsApiEtherNormalizer } from './pools-api-ether.normalizer';

@Injectable()
export class PoolsApiEtherService implements PoolsApiService {
  // for simplicity, we keep this variable in memory. In real scenario, we would use a database of some sort to not
  // fetch same pools over and over again
  private fromBlock: number = 12369621;

  constructor(
    private readonly etherApiService: EtherApiService,
    private readonly poolsApiEtherNormalizer: PoolsApiEtherNormalizer,
  ) {}

  public async getPoolsDetails(
    latestTimestamp: number | null,
  ): Promise<PoolDetailsDto[]> {
    const factory = this.etherApiService.getFactoryContract();

    const filter = factory.filters.PoolCreated();
    const toBlock = await this.etherApiService.getProvider().getBlockNumber();

    // fetch maximum of 10 pools for testing purposes
    const maxPools = 10;
    // starting block
    const matchingEvents: any[] = [];

    while (matchingEvents.length < maxPools && this.fromBlock <= toBlock) {
      let endBlock = this.fromBlock + 1000;
      if (endBlock > toBlock) endBlock = toBlock;

      try {
        const events = await factory.queryFilter(
          filter,
          this.fromBlock,
          endBlock,
        );

        for (const event of events) {
          const block = await this.etherApiService
            .getProvider()
            .getBlock(event.blockNumber);
          if (!block) continue;

          const timestamp = block.timestamp;
          const eventWithTimestamp = event as any;
          eventWithTimestamp.createdAtTimestamp = timestamp;
          matchingEvents.push(eventWithTimestamp);

          if (matchingEvents.length >= maxPools) {
            break;
          }
        }

        this.fromBlock =
          events.length > 0
            ? events[events.length - 1].blockNumber + 1
            : endBlock + 1;
      } catch (err) {
        console.error(
          `Failed fetching blocks ${this.fromBlock}–${endBlock}:`,
          err,
        );
        this.fromBlock = endBlock + 1;
      }

      // we wait because api returns error if we don't upgrade our plan
      await this.delay(300);
    }

    return this.poolsApiEtherNormalizer.normalizePoolDetails({
      events: matchingEvents,
    });
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
