import { Module } from '@nestjs/common';
import { TicksService } from './ticks.service';

@Module({
  providers: [TicksService],
})
export class TicksModule {}
