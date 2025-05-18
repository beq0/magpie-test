import { Injectable } from '@nestjs/common';
import { PoolDetailsDto } from './pools-api/dto/pool-details.dto';
import { Pool } from './pool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(Pool)
    private readonly poolsRepository: Repository<Pool>,
  ) {}

  public async savePools(pools: PoolDetailsDto[]): Promise<Pool[]> {
    const poolEntities = this.poolsRepository.create(
      pools.map((pool) => ({
        id: pool.id,
        token0Id: pool.token0.id,
        token1Id: pool.token1.id,
        feeTier: pool.feeTier,
        sqrtPrice: pool.sqrtPrice,
        liquidity: pool.liquidity,
        createdAtTimestamp: pool.createdAtTimestamp,
      })),
    );

    return this.poolsRepository.save(poolEntities);
  }

  public async getLatestPoolTimestamp(): Promise<number | null> {
    const result = await this.poolsRepository
      .createQueryBuilder('pool')
      .select('MAX("pool"."createdAtTimestamp"::numeric)', 'maxTimestamp')
      .getRawOne();

    return result?.maxTimestamp ? Number(result.maxTimestamp) : null;
  }
}
