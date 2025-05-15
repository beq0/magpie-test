import { PoolDetailsDto } from './dto/pool-details.dto';

import { Injectable, NotImplementedException } from '@nestjs/common';
import { PoolsApiService } from './pools-api.service.interface';

@Injectable()
export class PoolsApiEtherService implements PoolsApiService {
  public async getPools(): Promise<PoolDetailsDto> {
    throw new NotImplementedException('Not implemented');
  }
}
