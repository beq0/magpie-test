import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {PoolsModule} from "../pools/pools.module";
import {TicksModule} from "../ticks/ticks.module";
import {TokensModule} from "../tokens/tokens.module";
import {LockModule} from "../lock/lock.module";

@Module({
  imports: [PoolsModule, TicksModule, TokensModule, LockModule],
  providers: [TasksService]
})
export class TasksModule {}
