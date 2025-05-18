import {TokenDetailsDto} from "../../../tokens/dto/token-details.dto";

export class PoolDetailsDto {
  id: string;
  token0: TokenDetailsDto;
  token1: TokenDetailsDto;
  feeTier: string;
  sqrtPrice: string;
  liquidity: string;
  createdAtTimestamp: string;
}
