import {Injectable} from '@nestjs/common';
import {TickDetailsDto} from "./ticks-api/dto/ticks-details.dto";
import {Tick} from "./tick.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TicksService {
    constructor(@InjectRepository(Tick)
                private readonly ticksRepository: Repository<Tick>) {
    }

    public async saveTicks(ticks: TickDetailsDto[]): Promise<Tick[]> {
        const tickEntities = this.ticksRepository.create(
            ticks.map(tick => ({
                id: tick.id,
                poolId: tick.poolId,
                liquidityNet: tick.liquidityNet,
                liquidityGross: tick.liquidityGross,
                price0: tick.price0,
                price1: tick.price1,
            }))
        );

        return this.ticksRepository.save(tickEntities);
    }
}
