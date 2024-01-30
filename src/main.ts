require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as serverlessHttp from 'serverless-http';
import * as fastify from 'fastify';

let lambdaApp: any;

async function bootstrap() {
  if (!lambdaApp) {

    const app = await NestFactory.create(
      AppModule,
      new FastifyAdapter({ logger: true }),
    );

    await app.init();
    lambdaApp = serverlessHttp(app.getHttpAdapter().getInstance());
  }
  return lambdaApp;
}

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const app = await bootstrap();
  return app(event, context);
};

