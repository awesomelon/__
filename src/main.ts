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
import { AllExceptionFilter } from './catch/error.handler';

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

  await app.listen(process.env.API_PORT, '0.0.0.0').then(() => {
    console.log(`🚀 Server ready at http://localhost:${process.env.API_PORT}`);
    console.log(
      `📒 Documents at http://localhost:${process.env.API_PORT}/docs`,
    );
  });
}
bootstrap();
