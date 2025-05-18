import { PoolDetailsDto } from './dto/pool-details.dto';

export interface PoolsApiService {
  getPoolsDetails(latestTimestamp: number | null): Promise<PoolDetailsDto[]>;
}
