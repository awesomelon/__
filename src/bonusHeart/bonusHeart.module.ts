// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// User
import { UserModule } from 'src/user/user.module';

// History
import { HistoryModule } from 'src/history/history.module';

// Bonus
import { BonusHeartService } from './bonusHeart.service';
import { BonusHeartController } from './bonusHeart.controller';
import { BonusHeartItemModule } from './bonusHeartItem.module';
import { BonusHeart } from './entity';

// Common
import { CommonService } from 'src/common/service/common.service';

// lib
import { DataSource, Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BonusHeart]),
    UserModule,
    HistoryModule,
    BonusHeartItemModule,
  ],
  controllers: [BonusHeartController],
  providers: [
    BonusHeartService,
    {
      provide: CommonService,
      useFactory: (
        repository: Repository<BonusHeart>,
        dataSource: DataSource,
      ) => new CommonService<BonusHeart>(repository, dataSource),
      inject: [getRepositoryToken(BonusHeart), DataSource],
    },
  ],
  exports: [BonusHeartService],
})
export class BonusHeartModule {}
