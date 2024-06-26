// core
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

// common
import { DBConfigModule } from './database/config.module';
import { AllExceptionFilter } from './common/middleware/error';

import { HealthController } from './health/health.controller';

// Auth
import { AuthModule } from './auth/auth.module';

// User
import { UserModule } from './user/user.module';

// Heart
import { HeartModule } from './heart/heart.module';

// BonusHeart
import { BonusHeartModule } from './bonusHeart/bonusHeart.module';

// History
import { HistoryModule } from './history/history.module';

// lib
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs'),
      exclude: ['/api/(.*)'],
    }),
    DBConfigModule,
    TerminusModule,
    AuthModule,
    UserModule,
    HeartModule,
    BonusHeartModule,
    HistoryModule,
    HealthModule,
  ],
  controllers: [],
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
export class AppModule {}
