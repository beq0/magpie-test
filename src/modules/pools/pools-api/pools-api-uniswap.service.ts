import { PoolDetailsDto } from './dto/pool-details.dto';

import { Inject, Injectable } from '@nestjs/common';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core';
import { UNISWAP_CLIENT_TOKEN } from '../../api/apollo-client-provider.token';
import { PoolsApiService } from './pools-api.service.interface';
import { PoolsApiUniswapNormalizer } from './normalizers/pools-api-uniswap.normalizer';

@Injectable()
export class PoolsApiUniswapService implements PoolsApiService {
  constructor(
    @Inject(UNISWAP_CLIENT_TOKEN)
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly poolsApiUniswapNormalizer: PoolsApiUniswapNormalizer,
  ) {}

  public async getPoolsDetails(
    latestTimestamp: number | null,
  ): Promise<PoolDetailsDto[]> {
    let allPools: PoolDetailsDto[] = [];
    let skip = 0;
    const first = 10;
    // We will use 2024 as default first date, as the pools from before that have a huge amount of ticks
    // and it will take too long to fetch them all (for testing purposes). In real scenario, we would have db
    // setup with all of the pools from the beginning.
    const createdAt = latestTimestamp
      ? latestTimestamp - 10
      : Math.floor(new Date('2024-01-01').getTime() / 1000);

    while (true) {
      const result = await this.apolloClient.query({
        query: gql`
          query GetPools($first: Int!, $skip: Int!, $createdAt: BigInt!) {
            pools(
              first: $first
              skip: $skip
              where: { createdAtTimestamp_gt: $createdAt }
              orderBy: createdAtTimestamp
              orderDirection: asc
            ) {
              id
              token0 {
                symbol
                id
                decimals
                totalSupply
                derivedETH
              }
              token1 {
                symbol
                id
                decimals
                totalSupply
                derivedETH
              }
              feeTier
              sqrtPrice
              liquidity
              createdAtTimestamp
            }
          }
        `,
        variables: {
          first,
          skip,
          createdAt,
        },
      });
      const poolsBatch = this.poolsApiUniswapNormalizer.normalizePoolDetails(
        result.data['pools'],
      );

      // We will not fetch more than 100 pools per sync task, since ticks might be too many
      if (!poolsBatch.length || allPools.length >= 100) {
        break;
      }

      allPools = allPools.concat(poolsBatch);
      skip += first;
    }

    return allPools;
  }
}
