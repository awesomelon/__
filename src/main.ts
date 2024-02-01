// core
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';

// fastify
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';

import { AppModule } from './app.module';
import { APIDocumentation } from './document';
import { AllExceptionFilter } from './common/middleware';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const document = new APIDocumentation();
  document.setup(app);

  await app.register(fastifyCsrf);
  await app.register(helmet);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.API_PORT, '0.0.0.0').then(async () => {
    console.log(`🚀 Server ready at ${await app.getUrl()}`);
    console.log(`🚀 Server ready at ${await app.getUrl()}/swagger`);
    console.log(`🚀 Server ready at ${await app.getUrl()}/docs`);
  });
}
bootstrap();
