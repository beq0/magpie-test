import {TickDetailsDto} from "./dto/ticks-details.dto";

export interface TicksApiService {
  getTicksByPoolIds(poolIds: string[]): Promise<TickDetailsDto[]>;
}
