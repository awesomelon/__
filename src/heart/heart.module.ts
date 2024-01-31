// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// Heart
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';
import { Heart } from './entity';
import { HeartItemModule } from './heartItemModule';

// BonusHeart
import { BonusHeartModule } from 'src/bonusHeart/bonusHeart.module';

// History
import { HistoryModule } from 'src/history/history.module';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { DataSource, Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Heart]),
    HistoryModule,
    BonusHeartModule,
    HeartItemModule,
  ],
  controllers: [HeartController],
  providers: [
    HeartService,
    {
      provide: CommonService,
      useFactory: (repository: Repository<Heart>, dataSource: DataSource) =>
        new CommonService<Heart>(repository, dataSource),
      inject: [getRepositoryToken(Heart), DataSource],
    },
  ],
  exports: [HeartService],
})
export class HeartModule {}
