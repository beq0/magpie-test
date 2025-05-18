import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {PoolsModule} from "../pools/pools.module";
import {TicksModule} from "../ticks/ticks.module";

@Module({
  imports: [PoolsModule, TicksModule],
  providers: [TasksService]
})
export class TasksModule {}
