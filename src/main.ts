import * as dotenv from 'dotenv';
dotenv.config();

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port, () =>
    new Logger().log(`Server is running on http://localhost:${port}`),
  );
}

bootstrap();
