import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolsModule } from './modules/pools/pools.module';
import { TicksModule } from './modules/ticks/ticks.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PoolsModule,
    TicksModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
