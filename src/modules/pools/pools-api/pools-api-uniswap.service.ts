import {PoolDetailsDto} from './dto/pool-details.dto';

import {Inject, Injectable} from '@nestjs/common';
import {ApolloClient, gql, NormalizedCacheObject} from '@apollo/client/core';
import {UNISWAP_CLIENT_TOKEN} from '../../api/apollo-client-provider.token';
import {PoolsApiService} from './pools-api.service.interface';
import {PoolsApiUniswapNormalizer} from "./pools-api-uniswap.normalizer";

@Injectable()
export class PoolsApiUniswapService implements PoolsApiService {
  constructor(
    @Inject(UNISWAP_CLIENT_TOKEN)
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly poolsApiUniswapNormalizer: PoolsApiUniswapNormalizer,
  ) {}

  public async getPoolsDetails(createdAt?: number): Promise<PoolDetailsDto[]> {
    const result = await this.apolloClient.query({
      query: gql`
      query GetPools($first: Int!, $skip: Int!, $createdAt: BigInt!) {
        pools(first: $first, skip: $skip, where: { createdAtTimestamp_gt: $createdAt }) {
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
        first: 10,
        skip: 0,
        createdAt: createdAt - 10 || (new Date("1980-01-01").getTime() / 1000).toFixed(),
      },
    });

    return this.poolsApiUniswapNormalizer.normalizePoolDetails(result.data['pools']);
  }
}
