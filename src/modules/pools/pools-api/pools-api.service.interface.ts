import { PoolDetailsDto } from './dto/pool-details.dto';

export interface PoolsApiService {
  getPools(): Promise<PoolDetailsDto>;
}
