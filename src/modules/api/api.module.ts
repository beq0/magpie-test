import { Module } from '@nestjs/common';
import { apolloClientProvider } from './apollo-client.provider';
import { EtherApiService } from './ether-api.service';

@Module({
  providers: [apolloClientProvider, EtherApiService],
  exports: [apolloClientProvider, EtherApiService],
})
export class ApiModule {}
