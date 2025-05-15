import { PoolDetailsDto } from './dto/pool-details.dto';

import { Inject, Injectable } from '@nestjs/common';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core';
import { UNISWAP_CLIENT_TOKEN } from '../../api/apollo-client-provider.token';
import { PoolsApiService } from './pools-api.service.interface';

@Injectable()
export class PoolsApiUniswapService implements PoolsApiService {
  constructor(
    @Inject(UNISWAP_CLIENT_TOKEN)
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {}

  public async getPools(): Promise<PoolDetailsDto> {
    const result = await this.apolloClient.query({
      query: gql`
        query {
          pools(first: 100, skip: 1000) {
            id
            ticks {
              id
              liquidityGross
              liquidityNet
              price0
              price1
            }
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
          }
        }
      `,
    });

    return result.data;
  }
}
