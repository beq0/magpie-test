import { Module } from '@nestjs/common';
import { apolloClientProvider } from './apollo-client.provider';

@Module({ providers: [apolloClientProvider], exports: [apolloClientProvider] })
export class ApiModule {}
