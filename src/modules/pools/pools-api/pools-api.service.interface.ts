import { PoolDetailsDto } from './dto/pool-details.dto';

export interface PoolsApiService {
  getPoolsDetails(): Promise<PoolDetailsDto[]>;
}
