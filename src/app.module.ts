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
import { DBConfigModule } from './database/config.module';
import { AllExceptionFilter } from './utils/error.handler';
import { HealthController } from './health/health.controller';
import { LoggerMiddleware } from './logger/logger.middleware';

// Auth
import { AuthModule } from './auth/auth.module';

// User
import { UserModule } from './user/user.module';

// Heart
import { HeartModule } from './heart/heart.module';

// BonusHeart
import { BonusHeartModule } from './bonusHeart/bonusHeart.module';
import { HeartController } from './heart/heart.controller';
import { BonusHeartController } from './bonusHeart/bonusHeart.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DBConfigModule,
    TerminusModule,
    AuthModule,
    UserModule,
    HeartModule,
    BonusHeartModule,
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
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(HealthController, HeartController, BonusHeartController);
  }
}
