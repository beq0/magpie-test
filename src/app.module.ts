import { Module } from '@nestjs/common';
import { PoolsModule } from './modules/pools/pools.module';
import { TicksModule } from './modules/ticks/ticks.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { LockModule } from './modules/lock/lock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ScheduleModule.forRoot(),
    LockModule,
    PoolsModule,
    TicksModule,
    TokensModule,
    TasksModule,
  ],
})
export class AppModule {}
