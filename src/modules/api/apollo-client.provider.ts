import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';
import { UNISWAP_CLIENT_TOKEN } from './apollo-client-provider.token';

export const apolloClientProvider = {
  provide: UNISWAP_CLIENT_TOKEN,
  useFactory: () => {
    return new ApolloClient({
      link: new HttpLink({
        uri: `https://gateway.thegraph.com/api/${process.env.UNISWAP_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`,
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  },
};
