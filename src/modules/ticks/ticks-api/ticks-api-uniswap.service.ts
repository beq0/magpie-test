import { Inject, Injectable } from '@nestjs/common';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core';
import { UNISWAP_CLIENT_TOKEN } from '../../api/apollo-client-provider.token';
import { TicksApiService } from './ticks-api.service.interface';
import { TicksApiUniswapNormalizer } from './ticks-api-uniswap.normalizer';
import { TickDetailsDto } from './dto/ticks-details.dto';

@Injectable()
export class TicksApiUniswapService implements TicksApiService {
  constructor(
    @Inject(UNISWAP_CLIENT_TOKEN)
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly ticksApiUniswapNormalizer: TicksApiUniswapNormalizer,
  ) {}

  public async getTicksByPoolIds(poolIds: string[]): Promise<TickDetailsDto[]> {
    let allTicks: TickDetailsDto[] = [];
    let skip = 0;
    const first = 30;

    if (!poolIds?.length) {
      return allTicks;
    }

    while (true) {
      const result = await this.apolloClient.query({
        query: gql`
          query GetTicks($first: Int!, $skip: Int!, $poolIds: [String!]) {
            ticks(
              first: $first
              skip: $skip
              where: { poolAddress_in: $poolIds }
            ) {
              id
              poolAddress
              liquidityGross
              liquidityNet
              price0
              price1
            }
          }
        `,
        variables: {
          first,
          skip,
          poolIds,
        },
      });

      const ticksBatch = this.ticksApiUniswapNormalizer.normalizeTickDetails(
        result.data['ticks'],
      );

      if (!ticksBatch.length) {
        break;
      }

      allTicks = allTicks.concat(ticksBatch);
      skip += first;
    }

    return allTicks;
  }
}
