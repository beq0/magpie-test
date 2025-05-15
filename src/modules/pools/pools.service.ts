import { Injectable } from '@nestjs/common';
import { PoolDetailsDto } from './pools-api/dto/pool-details.dto';

@Injectable()
export class PoolsService {
  constructor() {}

  public async savePools(pools: PoolDetailsDto[]): Promise<void> {}
}
