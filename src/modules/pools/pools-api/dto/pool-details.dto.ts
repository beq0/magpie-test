export class PoolDetailsDto {
  id: number;
  tickIds: string[];
  token0Id: string;
  token1Id: string;
  feeTier: number;
  sqrtPrice: number;
  liquidity: number;
}
