import {Injectable} from '@nestjs/common';
import {TickDetailsDto} from "./ticks-api/dto/ticks-details.dto";

@Injectable()
export class TicksService {

    public async saveTicks(ticks: TickDetailsDto[]): Promise<void> {}
}
