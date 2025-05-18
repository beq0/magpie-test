import { Injectable, NotImplementedException } from '@nestjs/common';
import { TicksApiService } from './ticks-api.service.interface';
import { TickDetailsDto } from './dto/ticks-details.dto';

@Injectable()
export class TicksApiEtherService implements TicksApiService {
  public getTicksByPoolIds(poolIds: string[]): Promise<TickDetailsDto[]> {
    throw new NotImplementedException('Not implemented');
  }
}
