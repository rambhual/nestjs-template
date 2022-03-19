import 'reflect-metadata';
import { NestApplicationOptions } from '@nestjs/common';
import { CrudConfigService } from '@nestjsx/crud';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as cookie from 'cookie-parser';

CrudConfigService.load({
  query: {
    limit: 10,
    cache: 2000,
    alwaysPaginate: true,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
});

import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app = await NestFactory.create<NestExpressApplication>(AppModule, opts);
  app.setGlobalPrefix('api/v1');
  app.disable('x-powered-by');
  app.enableCors({
    origin: ["http://localhost:3100"],
    credentials: true
  });
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.use(cookie())
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(3000);
}
bootstrap();
