import { Injectable } from '@nestjs/common';
import { TickDetailsDto } from './ticks-api/dto/ticks-details.dto';
import { Tick } from './tick.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicksService {
  constructor(
    @InjectRepository(Tick)
    private readonly ticksRepository: Repository<Tick>,
  ) {}

  public async saveTicks(ticks: TickDetailsDto[]): Promise<void> {
    const tickEntities = this.ticksRepository.create(
      ticks.map((tick) => ({
        id: tick.id,
        poolId: tick.poolId,
        liquidityNet: tick.liquidityNet,
        liquidityGross: tick.liquidityGross,
        price0: tick.price0,
        price1: tick.price1,
      })),
    );

    const uniqueTickEntities = tickEntities.filter(
      (tick, index, self) => index === self.findIndex((t) => t.id === tick.id),
    );

    await this.ticksRepository.upsert(uniqueTickEntities, {
      upsertType: 'on-duplicate-key-update',
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['id'],
    });
  }
}
