// core
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

// common
import { DbConfigModule } from './database/config.module';
import { AllExceptionFilter } from './catch/error.handler';
import { HealthController } from './health/health.controller';
import { LoggerMiddleware } from './logger/logger.middleware';

// Auth
import { AuthModule } from './auth/auth.module';

// User
import { UserModule } from './user/user.module';
import { CommonHeartModule } from './commonHeart/commonHeart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DbConfigModule,
    TerminusModule,
    AuthModule,
    UserModule,
    CommonHeartModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HealthController);
  }
}
