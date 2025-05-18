import { TokenDetailsUniswapDto } from '../../../tokens/tokens-api/dto/token-details-uniswap.dto';

export class PoolDetailsUniswapDto {
  id: string;
  token0: TokenDetailsUniswapDto;
  token1: TokenDetailsUniswapDto;
  feeTier: string;
  sqrtPrice: string;
  liquidity: string;
  createdAtTimestamp: string;
}
