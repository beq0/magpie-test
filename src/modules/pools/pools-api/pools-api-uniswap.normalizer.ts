import {Injectable} from "@nestjs/common";
import {PoolDetailsDto} from "./dto/pool-details.dto";
import {PoolDetailsUniswapDto} from "./dto/pool-details-uniswap.dto";

@Injectable()
export class PoolsApiUniswapNormalizer {
    public normalizePoolDetails(poolDetails: PoolDetailsUniswapDto[]): PoolDetailsDto[] {
        return poolDetails.map((pool) => {
            return {
                id: pool.id,
                token0Id: pool.token0.id,
                token1Id: pool.token1.id,
                feeTier: pool.feeTier,
                sqrtPrice: pool.sqrtPrice,
                liquidity: pool.liquidity,
                createdAtTimestamp: pool.createdAtTimestamp,
            };
        });
    }
}
