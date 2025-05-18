import { PoolDetailsDto } from './dto/pool-details.dto';

import { Injectable, NotImplementedException } from '@nestjs/common';
import { PoolsApiService } from './pools-api.service.interface';

@Injectable()
export class PoolsApiEtherService implements PoolsApiService {
  public async getPoolsDetails(latestTimestamp: number | null): Promise<PoolDetailsDto[]> {
    throw new NotImplementedException('Not implemented');
  }
}
