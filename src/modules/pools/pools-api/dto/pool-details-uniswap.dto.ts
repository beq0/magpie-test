export class PoolDetailsUniswapDto {
    id: string;
    token0: { id: string };
    token1: { id: string };
    feeTier: string;
    sqrtPrice: string;
    liquidity: string;
    createdAtTimestamp: string;
}
